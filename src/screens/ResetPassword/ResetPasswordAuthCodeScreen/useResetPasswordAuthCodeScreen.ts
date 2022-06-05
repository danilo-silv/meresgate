import { useCallback } from 'react'

import { RootStackScreenComponentProps } from 'navigation'
import { useBottomSheetContext } from 'src/contexts/BottomSheetContext'
import {
  usePreResetPasswordMutation,
  useResetPasswordMutation
} from 'src/integration/resources/resetPassword'

export const useResetPasswordAuthCodeScreen = ({
  navigation,
  route
}: RootStackScreenComponentProps<'ResetPasswordAuthCode'>) => {
  const preResetPasswordMutation = usePreResetPasswordMutation()

  const resetPasswordMutation = useResetPasswordMutation()

  const bottomSheetContext = useBottomSheetContext()

  const submit = useCallback(
    ({ code }: { code: string }) => {
      const { confirm_token, ...payload } = { ...route.params, code }

      resetPasswordMutation.mutate(payload, {
        onError: () =>
          bottomSheetContext.open({
            description: 'Você inseriu um código inválido.',
            title: 'Erro na autenticação'
          }),
        onSuccess: () =>
          navigation.reset({
            index: 0,
            routes: [{ name: 'ResetPasswordSuccessfully' }]
          })
      })
    },
    [bottomSheetContext, navigation, resetPasswordMutation, route.params]
  )

  const resendCode = useCallback(() => {
    const { slt, ...payload } = route.params

    preResetPasswordMutation.mutate(payload, {
      onError: () => {
        bottomSheetContext.open({
          description: `Erro ao reenviar SMS`,
          title: 'Não foi possível reenviar o SMS, tente novamente mais tarde'
        })
      },
      onSuccess: (responseData) => {
        navigation.setParams({
          ...route.params,
          slt: responseData.headers['x-slt']
        })

        bottomSheetContext.open({
          description: `Reenviamos o código de confirmação`,
          title: 'SMS enviado'
        })
      }
    })
  }, [bottomSheetContext, navigation, preResetPasswordMutation, route.params])

  return { preResetPasswordMutation, resendCode, resetPasswordMutation, submit }
}
