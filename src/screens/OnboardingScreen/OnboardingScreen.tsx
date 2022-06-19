import { useCallback } from 'react'

import { Icons } from 'atoms'
import { Button, Text, View } from 'native-base'
import { RootStackScreenComponent } from 'navigation'
import { StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from 'src/theme'

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
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.illustration}>
          <Icons.Onboarding size={378} />
        </View>
        <Text />

        <Text style={styles.title}>Seja bem vindo!</Text>

        <Text style={styles.subtitle}>
          Adotar é salvar vidas! Ter um animalzinho de estimação é ter uma amizade verdadeira e
          leal.
        </Text>

        <Button onPress={goToHomeScreen} style={{ backgroundColor: '#2B748E', width: '100%' }}>
          <Text fontSize={12} color="white" bold>
            Continuar
          </Text>
        </Button>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 30
  },
  title: {
    fontSize: 22,
    textAlign: 'center',
    color: theme.colors.primary[700],
    fontWeight: 'bold',
    lineHeight: 38
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 15,
    paddingVertical: 35,
    color: theme.colors.primary[600]
  },
  illustration: {}
})
