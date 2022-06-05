import { useCallback } from 'react'

import { RootStackScreenComponent } from 'navigation'
import { useBottomSheetContext } from 'src/contexts/BottomSheetContext'
import { usePreAuthMutation } from 'src/integration/resources/auth'
import {
  ConfirmAccountPhoneNumberPayload,
  useConfirmAccountPhoneNumberMutation
} from 'src/integration/resources/createAccount'
import Templates from 'templates'

export const CreateAccountAuthCodeScreen: RootStackScreenComponent<'CreateAccountAuthCode'> = ({
  navigation,
  route
}) => {
  const preAuthMutation = usePreAuthMutation()

  const confirmAccountPhoneNumberMutation = useConfirmAccountPhoneNumberMutation()

  const bottomSheetContext = useBottomSheetContext()

  const submit = useCallback(
    (formData: Pick<ConfirmAccountPhoneNumberPayload, 'code'>) => {
      confirmAccountPhoneNumberMutation.mutate(
        {
          ...formData,
          ...route.params
        },
        {
          onError: () =>
            bottomSheetContext.open({
              description: 'Código de autenticação inválido.',
              title: 'Erro na autenticação'
            }),
          onSuccess: () =>
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'CreateAccountSendEmailConfirmation',
                  params: {
                    email: route.params.email,
                    password: route.params.password
                  }
                }
              ]
            })
        }
      )
    },
    [confirmAccountPhoneNumberMutation, bottomSheetContext, navigation, route.params]
  )

  const resendCode = useCallback(
    () =>
      preAuthMutation.mutate(
        {
          email: route.params.email,
          password: route.params.password
        },
        {
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
              title: 'SMS reenviado'
            })
          }
        }
      ),
    [bottomSheetContext, navigation, preAuthMutation, route.params]
  )

  return (
    <Templates.AuthCodeScreen
      isResendingCode={preAuthMutation.isLoading}
      isSubmitting={confirmAccountPhoneNumberMutation.isLoading}
      resendCode={resendCode}
      submit={submit}
    />
  )
}
