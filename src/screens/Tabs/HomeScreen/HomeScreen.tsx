import { FunctionComponent } from 'react'

import { Button, Center, Text } from 'native-base'

import { useSetAuthAtom } from '../../../store/auth'

export const HomeScreen: FunctionComponent = () => {
  const setAuthAtom = useSetAuthAtom()

  return (
    <Center flex={1}>
      <Text>Home</Text>
      <Button onPress={() => setAuthAtom(null)}>Logout</Button>
    </Center>
  )
}
