import NetInfo from '@react-native-community/netinfo'
import { enableFreeze } from 'react-native-screens'
import { onlineManager } from 'react-query'

import { AppProviders } from './AppProviders'
import useCachedResources from './hooks/useCachedResources'
import { RootStackNavigator } from './navigation/RootStackNavigator'

enableFreeze(true)

/**
 * Reference: https://react-query.tanstack.com/react-native#online-status-management
 */
onlineManager.setEventListener((setOnline) => {
  return NetInfo.addEventListener((state: { isConnected: any }) => {
    setOnline(!!state.isConnected)
  })
})

export default function App() {
  const isLoadingComplete = useCachedResources()

  if (!isLoadingComplete) {
    return null
  } else {
    return (
      <AppProviders>
        <RootStackNavigator />
      </AppProviders>
    )
  }
}
