import { RootStackScreenComponent } from 'navigation'
import Templates from 'templates'

import { useLoginAuthCodeScreen } from './useLoginAuthCodeScreen'

export const LoginAuthCodeScreen: RootStackScreenComponent<'LoginAuthCode'> = ({
  navigation,
  route
}) => {
  const { isResendingCode, isSubmitting, resendCode, submit } = useLoginAuthCodeScreen({
    navigation,
    route
  })

  return <Templates.AuthCodeScreen {...{ isResendingCode, isSubmitting, resendCode, submit }} />
}
