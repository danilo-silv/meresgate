import { useCallback, useEffect, useMemo } from 'react'

import Layouts from 'layouts'
import { Button, Heading, Spinner, Text } from 'native-base'
import { RootStackScreenComponent } from 'navigation'
import { useConfirmAccountEmailMutation } from 'src/integration/resources/createAccount'

export const CreateAccountConfirmEmailScreen: RootStackScreenComponent<
  'CreateAccountConfirmEmail'
> = ({ navigation, route }) => {
  const confirmAccountEmailMutation = useConfirmAccountEmailMutation()

  const goToLoginScreen = useCallback(
    () =>
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }]
      }),
    [navigation]
  )

  const content = useMemo(() => {
    if (confirmAccountEmailMutation.isError) {
      return (
        <>
          <Heading textAlign="center">Não conseguimos validar seu e-mail</Heading>
          <Text textAlign="center">
            Não foi possível fazer a validação do seu e-mail, solicite um novo e-mail de confirmação
            ou tente novamente mais tarde.
          </Text>
          <Button onPress={goToLoginScreen}>OK</Button>
        </>
      )
    }

    if (confirmAccountEmailMutation.isLoading) {
      return <Spinner />
    }

    if (confirmAccountEmailMutation.isSuccess) {
      return (
        <>
          <Heading textAlign="center">E-mail confirmado com sucesso</Heading>
          <Text textAlign="center">
            Agora o seu cadastro precisa ser aprovado para você realizar o login. Isso pode levar
            alguns dias. Aguarde um e-mail com maiores instruções.
          </Text>
          <Button onPress={goToLoginScreen}>OK</Button>
        </>
      )
    }
  }, [confirmAccountEmailMutation, goToLoginScreen])

  useEffect(() => {
    confirmAccountEmailMutation.mutate(route.params)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return <Layouts.Internal typeTwo>{content}</Layouts.Internal>
}
