import { FunctionComponent, memo } from 'react'

import { KeyboardAvoidingView, VStack } from 'native-base'
import { Platform } from 'react-native'

interface Props {
  children: React.ReactNode
}

export const ExternalLayout: FunctionComponent<Props> = memo(({ children }) => (
  <KeyboardAvoidingView {...(Platform.OS === 'android' ? {} : { behavior: 'padding' })} flex={1}>
    <VStack flex={1} justifyContent="center" p={5}>
      {children}
    </VStack>
  </KeyboardAvoidingView>
))
