import { useCallback } from 'react'

import Layouts from 'layouts'
import { Button, Heading, Text } from 'native-base'
import { RootStackScreenComponent } from 'navigation'

export const ResetPasswordSuccessfullyScreen: RootStackScreenComponent<
  'ResetPasswordSuccessfully'
> = ({ navigation }) => {
  const goToLoginScreen = useCallback(
    () =>
      navigation.reset({
        index: 0,
        routes: [{ name: 'Entry' }, { name: 'Login' }]
      }),
    [navigation]
  )

  return (
    <Layouts.Internal typeTwo>
      <Heading textAlign="center">Nova senha redefinida com sucesso</Heading>
      <Text textAlign="center">Faça o login novamente com a nova senha.</Text>
      <Button onPress={goToLoginScreen}>Ir para login</Button>
    </Layouts.Internal>
  )
}
