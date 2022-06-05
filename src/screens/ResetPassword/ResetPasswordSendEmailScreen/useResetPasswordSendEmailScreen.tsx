import { useCallback } from 'react'

import { RootStackScreenComponentProps } from 'navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { useBottomSheetContext } from 'src/contexts/BottomSheetContext'
import {
  SendEmailResetPasswordPayload,
  useSendEmailResetPasswordMutation
} from 'src/integration/resources/resetPassword'

export const useResetPasswordSendEmailScreen = ({
  navigation
}: Pick<RootStackScreenComponentProps<'ResetPasswordSendEmail'>, 'navigation'>) => {
  const { control, handleSubmit } = useForm<SendEmailResetPasswordPayload>()

  const sendEmailResetPasswordMutation = useSendEmailResetPasswordMutation()

  const bottomSheetContext = useBottomSheetContext()

  const submit = handleSubmit(
    useCallback<SubmitHandler<SendEmailResetPasswordPayload>>(
      (formData) => {
        Keyboard.dismiss()

        sendEmailResetPasswordMutation.mutate(formData, {
          onError: () =>
            bottomSheetContext.open({
              description: 'Não foi possível enviar o e-mail de redefinição de senha.',
              title: 'Erro ao enviar email'
            }),
          onSuccess: () => {
            navigation.navigate('ResetPasswordEmailSentSuccessfully', formData)
          }
        })
      },
      [bottomSheetContext, navigation, sendEmailResetPasswordMutation]
    )
  )

  return { control, sendEmailResetPasswordMutation, submit }
}
