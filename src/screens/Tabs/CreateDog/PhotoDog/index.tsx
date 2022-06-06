import { FunctionComponent } from 'react'

import { Button, Center, Text } from 'native-base'

import { useSetAuthAtom } from '../../../../store/auth'

export const PhotoDog: FunctionComponent = () => {
  const setAuthAtom = useSetAuthAtom()

  return (
    <Center flex={1}>
      <Text>PhotoDog</Text>
      <Button onPress={() => setAuthAtom(null)}>Logout</Button>
    </Center>
  )
}
