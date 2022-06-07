import { FunctionComponent } from 'react'

import { NativeBaseProvider, StatusBar } from 'native-base'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { QueryClient, QueryClientProvider } from 'react-query'
import { theme } from 'src/theme'

import { BottomSheetProvider } from './contexts/BottomSheetContext'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      notifyOnChangeProps: 'tracked'
    }
  }
})

interface Props {
  children: React.ReactNode
}

export const AppProviders: FunctionComponent<Props> = ({ children }: Props) => (
  <GestureHandlerRootView style={{ flex: 1 }}>
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <NativeBaseProvider
          initialWindowMetrics={{
            frame: { x: 0, y: 0, width: 0, height: 0 },
            insets: { top: 0, left: 0, right: 0, bottom: 0 }
          }}
          theme={theme}
          config={{ suppressColorAccessibilityWarning: true }}>
          <BottomSheetProvider>{children}</BottomSheetProvider>
          <StatusBar barStyle="light-content" />
        </NativeBaseProvider>
      </SafeAreaProvider>
    </QueryClientProvider>
  </GestureHandlerRootView>
)
