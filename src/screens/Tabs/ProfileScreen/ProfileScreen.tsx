import { FunctionComponent } from 'react'

import EditScreenInfo from 'components/EditScreenInfo'
import { StatusBar } from 'expo-status-bar'
import { Text, View } from 'native-base'
import { Platform, StyleSheet } from 'react-native'

export const ProfileScreen: FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator} />
      <EditScreenInfo path="/screens/ProfileScreen.tsx" />
      <Text>d</Text>
      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    color: '#eee'
  }
})
