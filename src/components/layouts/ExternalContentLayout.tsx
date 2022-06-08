import { FunctionComponent, memo } from 'react'

import { Image, KeyboardAvoidingView, VStack } from 'native-base'
import { Platform, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from 'src/theme'

import LogoTwo from '../../assets/LogoTwo.png'

interface Props {
  children: React.ReactNode
}

export const ExternalContentLayout: FunctionComponent<Props> = memo(({ children }) => (
  <KeyboardAvoidingView {...(Platform.OS === 'android' ? {} : { behavior: 'padding' })} flex={1}>
    <SafeAreaView style={styles.container}>
      <Image source={LogoTwo} resizeMode="contain" alt="LogoOne" width={300} height={90} />
    </SafeAreaView>

    <VStack flex={1} justifyContent="center">
      {children}
    </VStack>
  </KeyboardAvoidingView>
))

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary[400],
    paddingTop: 18,
    paddingBottom: 120
  }
})
