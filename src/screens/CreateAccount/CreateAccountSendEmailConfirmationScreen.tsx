import { useCallback } from 'react'

import Layouts from 'layouts'
import { Button, Heading, Text } from 'native-base'
import { RootStackScreenComponent } from 'navigation'
import { useBottomSheetContext } from 'src/contexts/BottomSheetContext'
import { usePreAuthMutation } from 'src/integration/resources/auth'

export const CreateAccountSendEmailConfirmationScreen: RootStackScreenComponent<
  'CreateAccountSendEmailConfirmation'
> = ({ navigation, route }) => {
  const preAuthMutation = usePreAuthMutation()

  const bottomSheetContext = useBottomSheetContext()

  const goToChangeEmailScreen = useCallback(
    () => navigation.navigate('CreateAccountChangeEmail'),
    [navigation]
  )

  const goToLoginScreen = useCallback(
    () =>
      navigation.reset({
        index: 0,
        routes: [{ name: 'Entry' }, { name: 'Login' }]
      }),
    [navigation]
  )

  const resendEmail = useCallback(
    () =>
      preAuthMutation.mutate(
        {
          email: route.params.email,
          password: route.params.password
        },
        {
          onError: () => {
            bottomSheetContext.open({
              description: `Erro ao reenviar e-mail`,
              title: 'Não foi possível reenviar o e-mail, tente novamente mais tarde'
            })
          },
          onSuccess: () =>
            bottomSheetContext.open({
              description: `Reenviamos o link de confirmação de cadastro para o e-mail ${route.params.email}.`,
              title: 'Reenviamos o e-mail!'
            })
        }
      ),
    [bottomSheetContext, preAuthMutation, route.params]
  )

  return (
    <Layouts.External>
      <Heading textAlign="center">Falta pouco</Heading>
      <Text textAlign="center">
        Um e-mail com um link de confirmação foi enviado para {route.params.email}. Acesse seu
        e-mail para confirmar seu cadastro.
      </Text>
      <Text textAlign="center">Não recebeu o e-mail de confirmação?</Text>
      <Button isLoading={preAuthMutation.isLoading} mt={2} onPress={resendEmail}>
        Reenviar e-mail
      </Button>
      <Text textAlign="center">
        Caso não tenha recebido o e-mail, certifique-se de que o e-mail informado está correto e
        verifique a sua caixa de spam.
      </Text>
      <Button onPress={goToChangeEmailScreen} variant="link">
        Alterar meu e-mail
      </Button>
      <Button onPress={goToLoginScreen} variant="outline" marginTop={100}>
        Ir para o Login
      </Button>
    </Layouts.External>
  )
}
