import { RootStackScreenComponent } from 'navigation'
import Templates from 'templates'

import { useResetPasswordCreatePasswordScreen } from './useResetPasswordCreatePasswordScreen'

export const ResetPasswordCreatePasswordScreen: RootStackScreenComponent<
  'ResetPasswordCreatePassword'
> = ({ navigation, route }) => {
  const { preResetPasswordMutation, submit } = useResetPasswordCreatePasswordScreen({
    navigation,
    route
  })

  return (
    <Templates.CreatePasswordScreen
      isSubmitting={preResetPasswordMutation.isLoading}
      submit={submit}
    />
  )
}
