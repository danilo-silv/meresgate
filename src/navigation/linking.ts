/**
 * Learn more about deep linking with React Navigation
 * https://reactnavigation.org/docs/deep-linking
 * https://reactnavigation.org/docs/configuring-links
 */

import { LinkingOptions } from '@react-navigation/native'
import * as Linking from 'expo-linking'

import { RootStackParamList } from '../types'

export const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl('/')],
  config: {
    initialRouteName: 'Login',
    screens: {
      Root: {
        screens: {
          HomeScreen: {
            screens: {
              TabOneScreen: 'one'
            }
          },
          ProfileScreen: {
            screens: {
              TabTwoScreen: 'two'
            }
          }
        }
      },
      CreateAccountConfirmEmail: {
        path: 'cadastro/email/confirmacao/processando'
      },
      ResetPasswordCreatePassword: {
        path: 'redefinir-senha/senha'
      },
      NotFound: '*'
    }
  }
}
