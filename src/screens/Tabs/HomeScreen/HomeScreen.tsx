import { useCallback, useState } from 'react'

import Layouts from 'layouts'
import { MotiView } from 'moti'
import { Button, HStack, ScrollView, Text, theme, View } from 'native-base'
import { StyleSheet } from 'react-native'
import { RootStackScreenProps } from 'src/types'

import { AbandonedPets } from './AbandonedPets'
import { PetsForAdoption } from './PetsForAdoption'

export const HomeScreen = (props: RootStackScreenProps<'Home'>) => {
  const [step, setStep] = useState<number>(1)

  const handleSetStep = useCallback((step) => setStep(step), [])

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Layouts.Internal typeTwo>
        <HStack alignItems="center" justifyContent="space-around">
          <View>
            <Button
              onPress={() => handleSetStep(1)}
              style={styles.button}
              borderColor={step === 1 ? theme.colors.primary[400] : 'transparent'}>
              <Text style={styles.text} color={theme.colors.white}>
                Animais
              </Text>
              <Text style={styles.text}>Abandonados</Text>
            </Button>
          </View>
          <View>
            <Button
              onPress={() => handleSetStep(2)}
              style={styles.button}
              borderColor={step === 2 ? theme.colors.primary[400] : 'transparent'}>
              <Text style={styles.text}>Animais</Text>
              <Text style={styles.text}>Para Adoção</Text>
            </Button>
          </View>
        </HStack>

        {step === 1 && (
          <MotiView
            from={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.9
            }}>
            <AbandonedPets {...props} />
          </MotiView>
        )}
        {step === 2 && (
          <MotiView
            from={{
              opacity: 0,
              scale: 0.9
            }}
            animate={{
              opacity: 1,
              scale: 1
            }}
            exit={{
              opacity: 0,
              scale: 0.9
            }}>
            <PetsForAdoption {...props} />
          </MotiView>
        )}
      </Layouts.Internal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  text: {
    color: theme.colors.primary[900],
    fontSize: 14,
    fontWeight: '700',
    lineHeight: 21,
    textAlign: 'center'
  },
  button: {
    width: 129,
    backgroundColor: theme.colors.white,
    borderRadius: 0,
    borderBottomWidth: 2
  }
})
