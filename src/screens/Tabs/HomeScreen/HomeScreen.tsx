import { useCallback } from 'react'

import { Button, Center, Text } from 'native-base'
import { RootStackScreenProps } from 'src/types'

import { useSetAuthAtom } from '../../../store/auth'

export const HomeScreen = ({ navigation }: RootStackScreenProps<'Home'>) => {
  const setAuthAtom = useSetAuthAtom()

  const goToKnowMore = useCallback(() => navigation.navigate('KnowMore'), [navigation])

  return (
    <Center flex={1}>
      <Text>Home</Text>
      <Button onPress={() => setAuthAtom(null)}>Logout</Button>
      <Button onPress={goToKnowMore}>Siba Mais</Button>
    </Center>
  )
}
