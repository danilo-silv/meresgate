/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FunctionComponent, useMemo } from 'react'

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Center, Spinner } from 'native-base'
import { ColorSchemeName } from 'react-native'
import { AcceptTermsScreen, RefuseTermsScreen, OnboardingScreen } from 'src/screens'
import { useAuthAtomValue } from 'src/store/auth'

import { RootStackParamList } from '../types'
import { linking } from './linking'
import { loggedScreens } from './loggedScreens'
import { noLoggedScreens } from './noLoggedScreens'

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const NativeStackNavigator = createNativeStackNavigator<RootStackParamList>()

export const RootStackNavigator: FunctionComponent = () => {
  const authAtomValue = useAuthAtomValue()

  const screens = useMemo(() => {
    // user is logged
    if (authAtomValue) {
      // User needs to accept the terms
      if (
        !authAtomValue.user.accepted_commitment_term_at ||
        !authAtomValue.user.accepted_responsibility_term_at
      ) {
        return (
          <>
            <NativeStackNavigator.Screen component={AcceptTermsScreen} name="AcceptTerms" />
            <NativeStackNavigator.Screen component={RefuseTermsScreen} name="RefuseTerms" />
          </>
        )
      }

      // In the first access of the user we show the onboarding screen to him
      if (!authAtomValue.skipOnboarding) {
        return <NativeStackNavigator.Screen component={OnboardingScreen} name="Onboarding" />
      }

      // other screens
      return Object.entries(loggedScreens).map(([name, component]) => (
        <NativeStackNavigator.Screen
          component={component}
          key={name}
          name={name as keyof RootStackParamList}
        />
      ))
    }

    // Auth flow, create account and reset password
    return Object.entries(noLoggedScreens).map(([name, component]) => (
      <NativeStackNavigator.Screen
        component={component}
        key={name}
        name={name as keyof RootStackParamList}
      />
    ))
  }, [authAtomValue])

  if (authAtomValue === undefined) {
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    )
  }

  return (
    <NavigationContainer {...{ linking }}>
      <NativeStackNavigator.Navigator
        initialRouteName="Entry"
        screenOptions={{ headerShown: false }}>
        {screens}
      </NativeStackNavigator.Navigator>
    </NavigationContainer>
  )
}
