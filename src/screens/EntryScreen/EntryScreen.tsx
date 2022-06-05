import { useCallback } from 'react'

import { Button, Center, VStack } from 'native-base'
import { RootStackScreenComponent } from 'navigation'

export const EntryScreen: RootStackScreenComponent<'Entry'> = ({ navigation }) => {
  const goToCreateAccountCNPJScreen = useCallback(
    () => navigation.navigate('CreateAccountCNPJ'),
    [navigation]
  )

  const goToLoginScreen = useCallback(() => navigation.navigate('Login'), [navigation])

  return (
    <Center flex={1}>
      <VStack space={2}>
        <Button onPress={goToLoginScreen}>Fazer Login</Button>
        <Button onPress={goToCreateAccountCNPJScreen} variant="outline">
          Criar Conta
        </Button>
      </VStack>
    </Center>
  )
}
