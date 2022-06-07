import { FunctionComponent } from 'react'

import { Text, View } from 'native-base'
import { StyleSheet } from 'react-native'

export const ProfileScreen: FunctionComponent = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      <View style={styles.separator} />

      <Text>d</Text>
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
