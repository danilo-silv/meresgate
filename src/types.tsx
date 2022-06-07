/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { FunctionComponent } from 'react'

import { BottomTabScreenProps } from '@react-navigation/bottom-tabs'
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native'
import { NativeStackScreenProps } from '@react-navigation/native-stack'

import { AuthPayload, PreAuthPayload } from './integration/resources/auth'
import {
  ConfirmAccountEmailPayload,
  ConfirmAccountPhoneNumberPayload,
  CreateAccountPayload
} from './integration/resources/createAccount'
import {
  PreResetPasswordPayload,
  ResetPasswordPayload
} from './integration/resources/resetPassword'

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined
  NotFound: undefined
  AcceptTerms: undefined
  RefuseTerms: undefined
  CreateAccountFirstName: undefined
  CreateAccountLastName: Pick<CreateAccountPayload, 'firstName'>
  CreateAccountEmail: Pick<CreateAccountPayload, 'firstName' | 'firstName'>
  CreateAccountPhone: Pick<CreateAccountPayload, 'firstName' | 'email'>
  CreateAccountCreatePassword: Pick<
    CreateAccountPayload,
    'firstName' | 'email' | 'phone_number_cell'
  >
  CreateAccountAuthCode: Omit<ConfirmAccountPhoneNumberPayload, 'code'>
  CreateAccountSendEmailConfirmation: Pick<CreateAccountPayload, 'email' | 'password'>
  CreateAccountChangeEmail: undefined
  CreateAccountConfirmEmail: ConfirmAccountEmailPayload
  Home: undefined
  Login: undefined
  LoginAuthCode: PreAuthPayload & Omit<AuthPayload, 'code'>
  Onboarding: undefined
  ResetPasswordEmailSentSuccessfully: { email: string }
  ResetPasswordSendEmail: undefined
  ResetPasswordCreatePassword: Pick<PreResetPasswordPayload, 'confirm_token' | 'id'>
  ResetPasswordAuthCode: PreResetPasswordPayload & Pick<ResetPasswordPayload, 'slt'>
  ResetPasswordSuccessfully: undefined
  Tabs: undefined
}

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>

export type RootTabParamList = {
  HomeScreen: undefined
  ProfileScreen: undefined
  PhotoDog: undefined
}

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>

export type RootStackScreenComponentProps<RouteName extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, RouteName>

export type RootStackScreenComponent<RouteName extends keyof RootStackParamList> =
  FunctionComponent<RootStackScreenComponentProps<RouteName>>
