import { useCallback } from 'react'

import { RootStackScreenComponentProps } from 'navigation'
import { CreatePasswordFormData } from 'src/components/templates/CreatePasswordScreenTemplate/CreatePasswordScreenTemplate'
import { useBottomSheetContext } from 'src/contexts/BottomSheetContext'
import { usePreResetPasswordMutation } from 'src/integration/resources/resetPassword'

export const useResetPasswordCreatePasswordScreen = ({
  navigation,
  route
}: RootStackScreenComponentProps<'ResetPasswordCreatePassword'>) => {
  const preResetPasswordMutation = usePreResetPasswordMutation()

  const bottomSheetContext = useBottomSheetContext()

  const submit = useCallback(
    (formData: CreatePasswordFormData) => {
      preResetPasswordMutation.mutate(
        {
          ...formData,
          ...route.params
        },
        {
          onError: () =>
            bottomSheetContext.open({
              description: 'Não foi possível redefinir sua senha.',
              title: 'Erro ao redefinir senha'
            }),
          onSuccess: (responseData) => {
            navigation.navigate('ResetPasswordAuthCode', {
              ...formData,
              ...route.params,
              slt: responseData.headers['x-slt']
            })
          }
        }
      )
    },
    [bottomSheetContext, navigation, preResetPasswordMutation, route.params]
  )

  return { preResetPasswordMutation, submit }
}
