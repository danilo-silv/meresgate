import { Button, Center, Text } from 'native-base'
import { RootStackScreenComponent } from 'navigation'

import { useSetAuthAtom } from '../../../store/auth'

export const HomeScreen: RootStackScreenComponent<'Home'> = () => {
  const setAuthAtom = useSetAuthAtom()

  return (
    <Center flex={1}>
      <Text>Home</Text>
      <Button onPress={() => setAuthAtom(null)}>Logout</Button>
    </Center>
  )
}
