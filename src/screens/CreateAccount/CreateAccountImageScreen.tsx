import { useCallback } from 'react'

import Layouts from 'layouts'
import { Button, Center, Text, VStack } from 'native-base'
import { RootStackScreenComponent } from 'navigation'
import { Keyboard } from 'react-native'

export const CreateAccountImageScreen: RootStackScreenComponent<'CreateAccountImage'> = ({
  navigation,
  route
}) => {
  const onSubmit = useCallback(() => {
    Keyboard.dismiss()

    navigation.navigate('CreateAccountCreatePassword', route.params)
  }, [navigation, route.params])

  return (
    <Layouts.Internal typeTwo>
      <VStack space={40} alignItems="center" justifyContent="space-around">
        <Center alignItems="center" justifyContent="center" mt={6} mb={6}>
          <Text fontSize={14} color="#2B748E" bold>
            Cadastre a sua foto de perfil em nossa plataforma
          </Text>
        </Center>
        <Center w="100%" alignItems="center" justifyContent="center">
          <Text>icone</Text>
        </Center>
        <Center w="100%">
          <Button mt={2} onPress={onSubmit} style={{ backgroundColor: '#2B748E', width: '100%' }}>
            <Text fontSize={12} color="white" bold>
              Salvar imagem
            </Text>
          </Button>
        </Center>
      </VStack>
    </Layouts.Internal>
  )
}
