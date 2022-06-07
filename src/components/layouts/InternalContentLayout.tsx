import { FunctionComponent, memo } from 'react'

import { Image, KeyboardAvoidingView, VStack } from 'native-base'
import { Platform, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { theme } from 'src/theme'

import LogoOne from '../../assets/LogoOne.png'
import LogoTwo from '../../assets/LogoTwo.png'

interface Props {
  children: React.ReactNode
  typeTwo?: boolean
}

export const InternalContentLayout: FunctionComponent<Props> = memo(({ children, typeTwo }) => (
  <KeyboardAvoidingView {...(Platform.OS === 'android' ? {} : { behavior: 'padding' })} flex={1}>
    <SafeAreaView style={styles.container}>
      <Image source={typeTwo ? LogoTwo : LogoOne} resizeMode="contain" alt="LogoOne" />
    </SafeAreaView>

    <VStack justifyContent="center" p={5}>
      {children}
    </VStack>
  </KeyboardAvoidingView>
))

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.primary[400],
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    paddingHorizontal: 22,
    paddingTop: Platform.OS === 'android' ? 25 : 0,
    paddingBottom: Platform.OS === 'android' ? 25 : 0
  }
})
