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
    <SafeAreaView
      style={{
        ...styles.container,
        paddingTop: Platform.OS === 'android' && !typeTwo ? 1 : 25,
        paddingBottom: Platform.OS === 'android' ? 18 : 0
      }}>
      <Image
        source={typeTwo ? LogoTwo : LogoOne}
        resizeMode="contain"
        alt="LogoOne"
        width={300}
        height={!typeTwo ? 200 : 90}
      />
    </SafeAreaView>

    <VStack flex={1} justifyContent="center" p={6}>
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
    paddingHorizontal: 22
  }
})
