import { useCallback } from 'react'

import { RootStackScreenComponentProps } from 'navigation'
import { useBottomSheetContext } from 'src/contexts/BottomSheetContext'
import { useAuthMutation, usePreAuthMutation } from 'src/integration/resources/auth'

import { useSetAuthAtom } from '../../../store/auth'

export const useLoginAuthCodeScreen = ({
  navigation,
  route
}: RootStackScreenComponentProps<'LoginAuthCode'>) => {
  const preAuthMutation = usePreAuthMutation()

  const authMutation = useAuthMutation()

  const setAuthAtom = useSetAuthAtom()

  const bottomSheetContext = useBottomSheetContext()

  const submit = useCallback(
    ({ code }: { code: string }) =>
      authMutation.mutate(
        { code, ...route.params },
        {
          onError: () =>
            bottomSheetContext.open({
              description: 'Você inseriu um código inválido.',
              title: 'Erro na autenticação'
            }),
          onSuccess: (responseData) => {
            /**
             * NOTE: RootStackNavigator is listening for authAtom.
             * Once authAtom receives a value, the RootStackNavigator will handle the transition to either the AcceptTerms screen or the Onboarding screen.
             */
            setAuthAtom(responseData.data.data)
          }
        }
      ),
    [authMutation, bottomSheetContext, route.params, setAuthAtom]
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
              title: 'SMS enviado'
            })
          }
        }
      ),
    [bottomSheetContext, navigation, preAuthMutation, route.params]
  )

  return {
    isResendingCode: preAuthMutation.isLoading,
    isSubmitting: authMutation.isLoading,
    resendCode,
    submit
  }
}
