import {
  CreateAccountFirstNameScreen,
  CreateAccountLastNameScreen,
  CreateAccountEmailScreen,
  CreateAccountPhoneScreen,
  CreateAccountCreatePasswordScreen,
  CreateAccountAuthCodeScreen,
  CreateAccountSendEmailConfirmationScreen,
  CreateAccountChangeEmailScreen,
  CreateAccountConfirmEmailScreen,
  LoginScreen,
  LoginAuthCodeScreen,
  ResetPasswordEmailSentSuccessfullyScreen,
  ResetPasswordSendEmailScreen,
  ResetPasswordCreatePasswordScreen,
  ResetPasswordAuthCodeScreen,
  ResetPasswordSuccessfullyScreen
} from 'src/screens'

import { RootStackScreenComponent } from '.'
import { RootStackParamList } from '../types'

export const noLoggedScreens: Partial<{
  [K in keyof RootStackParamList]: RootStackScreenComponent<K>
}> = {
  Login: LoginScreen,
  CreateAccountFirstName: CreateAccountFirstNameScreen,
  CreateAccountLastName: CreateAccountLastNameScreen,
  CreateAccountEmail: CreateAccountEmailScreen,
  CreateAccountPhone: CreateAccountPhoneScreen,
  CreateAccountCreatePassword: CreateAccountCreatePasswordScreen,
  CreateAccountAuthCode: CreateAccountAuthCodeScreen,
  CreateAccountSendEmailConfirmation: CreateAccountSendEmailConfirmationScreen,
  CreateAccountChangeEmail: CreateAccountChangeEmailScreen,
  CreateAccountConfirmEmail: CreateAccountConfirmEmailScreen,
  LoginAuthCode: LoginAuthCodeScreen,
  ResetPasswordEmailSentSuccessfully: ResetPasswordEmailSentSuccessfullyScreen,
  ResetPasswordSendEmail: ResetPasswordSendEmailScreen,
  ResetPasswordCreatePassword: ResetPasswordCreatePasswordScreen,
  ResetPasswordAuthCode: ResetPasswordAuthCodeScreen,
  ResetPasswordSuccessfully: ResetPasswordSuccessfullyScreen
}
