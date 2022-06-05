import { RootStackScreenComponent } from 'navigation'
import Templates from 'templates'

import { useResetPasswordAuthCodeScreen } from './useResetPasswordAuthCodeScreen'

export const ResetPasswordAuthCodeScreen: RootStackScreenComponent<'ResetPasswordAuthCode'> = ({
  navigation,
  route
}) => {
  const { preResetPasswordMutation, resendCode, resetPasswordMutation, submit } =
    useResetPasswordAuthCodeScreen({
      navigation,
      route
    })

  return (
    <Templates.AuthCodeScreen
      isResendingCode={preResetPasswordMutation.isLoading}
      isSubmitting={resetPasswordMutation.isLoading}
      resendCode={resendCode}
      submit={submit}
    />
  )
}
