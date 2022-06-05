import { useCallback } from 'react'

import { Button, Center, VStack } from 'native-base'
import { RootStackScreenComponent } from 'navigation'

import { useAuthAtom } from '../../store/auth'

export const OnboardingScreen: RootStackScreenComponent<'Onboarding'> = () => {
  const [authAtom, setAuthAtom] = useAuthAtom()

  const goToHomeScreen = useCallback(() => {
    /**
     * NOTE: RootStackNavigator is listening for authAtom.
     * Once authAtom change its value, the RootStackNavigator will handle the transition to the Home screen.
     */
    setAuthAtom({ ...authAtom!, skipOnboarding: true })
  }, [authAtom, setAuthAtom])

  return (
    <Center flex={1}>
      <VStack space={2}>
        <Button onPress={goToHomeScreen}>Começar</Button>
      </VStack>
    </Center>
  )
}
