import { FunctionComponent } from 'react'

import { View } from 'native-base'
import { StyleSheet } from 'react-native'

import Icon from '../Icons'

export const ButtonRegisterDog: FunctionComponent = () => (
  <View style={styles.container}>
    <Icon.RegisterDog size={78} />
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: 'auto',
    height: 'auto',
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    marginBottom: 60
  }
})
