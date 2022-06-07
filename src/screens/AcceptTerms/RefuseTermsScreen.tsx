import { useCallback } from 'react'

import Layouts from 'layouts'
import { Button, Heading, Text } from 'native-base'
import { RootStackScreenComponent } from 'navigation'

import { useSetAuthAtom } from '../../store/auth'

export const RefuseTermsScreen: RootStackScreenComponent<'RefuseTerms'> = ({ navigation }) => {
  const setAuthAtom = useSetAuthAtom()

  const onExit = useCallback(() => setAuthAtom(null), [setAuthAtom])

  return (
    <Layouts.Internal typeTwo>
      <Heading textAlign="center">
        Você recusou os termos e condições e a política de privacidade
      </Heading>
      <Text textAlign="center">
        Ao recusar os termos e condições e a política de privacidade não será possível acessar o
        App.
      </Text>
      <Button onPress={navigation.goBack}>Voltar para Termos</Button>
      <Button onPress={onExit} variant="ghost">
        Sair
      </Button>
    </Layouts.Internal>
  )
}
