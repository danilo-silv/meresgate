import {
  CreateAccountCNPJScreen,
  CreateAccountEmailScreen,
  CreateAccountPhoneScreen,
  CreateAccountCreatePasswordScreen,
  CreateAccountAuthCodeScreen,
  CreateAccountSendEmailConfirmationScreen,
  CreateAccountChangeEmailScreen,
  CreateAccountConfirmEmailScreen,
  EntryScreen,
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
  Entry: EntryScreen,
  CreateAccountCNPJ: CreateAccountCNPJScreen,
  CreateAccountEmail: CreateAccountEmailScreen,
  CreateAccountPhone: CreateAccountPhoneScreen,
  CreateAccountCreatePassword: CreateAccountCreatePasswordScreen,
  CreateAccountAuthCode: CreateAccountAuthCodeScreen,
  CreateAccountSendEmailConfirmation: CreateAccountSendEmailConfirmationScreen,
  CreateAccountChangeEmail: CreateAccountChangeEmailScreen,
  CreateAccountConfirmEmail: CreateAccountConfirmEmailScreen,
  Login: LoginScreen,
  LoginAuthCode: LoginAuthCodeScreen,
  ResetPasswordEmailSentSuccessfully: ResetPasswordEmailSentSuccessfullyScreen,
  ResetPasswordSendEmail: ResetPasswordSendEmailScreen,
  ResetPasswordCreatePassword: ResetPasswordCreatePasswordScreen,
  ResetPasswordAuthCode: ResetPasswordAuthCodeScreen,
  ResetPasswordSuccessfully: ResetPasswordSuccessfullyScreen
}
