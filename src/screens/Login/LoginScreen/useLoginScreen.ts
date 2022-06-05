import { createRef, useCallback, useEffect, useRef } from 'react'

import AsyncStorage from '@react-native-async-storage/async-storage'
import { RootStackScreenComponentProps } from 'navigation'
import { SubmitHandler, useForm } from 'react-hook-form'
import { Keyboard, TextInput } from 'react-native'
import { useBottomSheetContext } from 'src/contexts/BottomSheetContext'
import { usePreAuthMutation, PreAuthPayload } from 'src/integration/resources/auth'

export const refInputPassword = createRef<TextInput>()

export const handleInputPasswordFocus = () => refInputPassword.current?.focus()

const REMEMBER_EMAIL_STORAGE_KEY = 'rememberEmail'

export const useLoginScreen = ({
  navigation
}: Pick<RootStackScreenComponentProps<'Login'>, 'navigation'>) => {
  const rememberEmailRef = useRef(true)

  const { control, handleSubmit, setValue } = useForm<PreAuthPayload>({})

  const { isLoading, mutate } = usePreAuthMutation()

  const bottomSheetContext = useBottomSheetContext()

  const goToResetPasswordSendEmailScreen = useCallback(
    () => navigation.navigate('ResetPasswordSendEmail'),
    [navigation]
  )

  const setRememberEmail = useCallback((value: boolean) => {
    rememberEmailRef.current = value
  }, [])

  const submit = handleSubmit(
    useCallback<SubmitHandler<PreAuthPayload>>(
      (formData) => {
        Keyboard.dismiss()

        if (rememberEmailRef.current) {
          AsyncStorage.setItem(REMEMBER_EMAIL_STORAGE_KEY, formData.email)
        } else {
          AsyncStorage.removeItem(REMEMBER_EMAIL_STORAGE_KEY)
        }

        mutate(formData, {
          onError: () =>
            bottomSheetContext.open({
              description: 'Você inseriu um endereço de e-mail ou senha incorreta.',
              title: 'Erro no login'
            }),
          onSuccess: (responseData) =>
            navigation.navigate('LoginAuthCode', {
              ...formData,
              slt: responseData.headers['x-slt']
            })
        })
      },
      [bottomSheetContext, mutate, navigation]
    )
  )

  useEffect(() => {
    const getEmailFromStorage = async () => {
      const savedEmail = await AsyncStorage.getItem(REMEMBER_EMAIL_STORAGE_KEY)

      if (savedEmail) {
        setValue('email', savedEmail)
      }
    }

    getEmailFromStorage()
  }, [setValue])

  return {
    control,
    goToResetPasswordSendEmailScreen,
    isLoading,
    setRememberEmail,
    submit
  }
}
