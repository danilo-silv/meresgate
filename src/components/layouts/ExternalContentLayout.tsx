import { FunctionComponent, memo } from 'react'

import { Image, KeyboardAvoidingView, View, VStack } from 'native-base'
import { Platform, StyleSheet } from 'react-native'
import { theme } from 'src/theme'

import LogoOne from '../../assets/LogoOne.png'

interface Props {
  children: React.ReactNode
}

export const ExternalContentLayout: FunctionComponent<Props> = memo(({ children }) => (
  <KeyboardAvoidingView {...(Platform.OS === 'android' ? {} : { behavior: 'padding' })} flex={1}>
    <View style={styles.container}>
      <Image source={LogoOne} resizeMode="contain" alt="LogoOne" />
    </View>

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
    paddingBottom: 20
  }
})
