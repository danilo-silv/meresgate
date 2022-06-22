import { useCallback } from 'react'

import Layouts from 'layouts'
import { Button, Heading, Text } from 'native-base'
import { RootStackScreenComponent } from 'navigation'

export const ResetPasswordEmailSentSuccessfullyScreen: RootStackScreenComponent<
  'ResetPasswordEmailSentSuccessfully'
> = ({ navigation, route }) => {
  const goToLoginScreen = useCallback(
    () =>
      navigation.reset({
        index: 0,
        routes: [{ name: 'Login' }, { name: 'Login' }]
      }),
    [navigation]
  )

  return (
    <Layouts.Internal typeTwo>
      <Heading textAlign="center">E-mail enviado!</Heading>
      <Text textAlign="center">
        {`Verifique o seu e-mail ${route.params.email} e siga as instruções para redefinir a sua senha.\n\nNão recebeu o e-mail de redefinição da senha?`}
      </Text>
      <Button onPress={navigation.goBack}>Reenviar e-mail</Button>
      <Button onPress={goToLoginScreen} variant="ghost">
        Fazer login
      </Button>
    </Layouts.Internal>
  )
}
