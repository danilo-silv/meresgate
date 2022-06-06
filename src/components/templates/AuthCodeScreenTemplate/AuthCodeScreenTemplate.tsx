import { FunctionComponent, useCallback } from 'react'

import Layouts from 'layouts'
import { Button, FormControl, Heading, HStack, Input, Text } from 'native-base'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { validateAuthCode } from 'src/utils/validators'

type AuthCodeScreenTemplateProps = {
  isResendingCode: boolean
  isSubmitting: boolean
  resendCode(): void
  submit(values: FormData): void
}

type FormData = {
  code: string
}

export const AuthCodeScreenTemplate: FunctionComponent<AuthCodeScreenTemplateProps> = ({
  isResendingCode,
  isSubmitting,
  resendCode,
  submit
}) => {
  const {
    control,

    handleSubmit
  } = useForm<FormData>()

  const onSubmit = handleSubmit(
    useCallback<SubmitHandler<FormData>>(
      (formData) => {
        Keyboard.dismiss()

        submit(formData)
      },
      [submit]
    )
  )

  const onResendCode = useCallback(() => {
    Keyboard.dismiss()

    resendCode()
  }, [resendCode])

  return (
    <Layouts.Internal typeTwo>
      <Controller
        control={control}
        rules={{
          required: 'Digite seu código',
          validate: validateAuthCode
        }}
        render={({ field: { onChange: onChangeText, onBlur, value }, formState: { errors } }) => (
          <FormControl isInvalid={!!errors.code} isRequired>
            <Heading>Autenticação</Heading>
            <Text>Enviamos por sms o código de 6 dígitos. Digite abaixo o código.</Text>
            <Input
              {...{ onChangeText, onBlur, value }}
              enablesReturnKeyAutomatically
              keyboardType="number-pad"
              maxLength={6}
              onSubmitEditing={onSubmit}
              returnKeyType="next"
              testID="inputCode"
            />
            {errors.code && (
              <FormControl.ErrorMessage>{errors.code.message}</FormControl.ErrorMessage>
            )}
          </FormControl>
        )}
        name="code"
      />
      <Button isLoading={isSubmitting} mt={2} onPress={onSubmit} testID="confirmButton">
        Confirmar
      </Button>
      <HStack alignItems="center">
        <Text>Não recebeu seu código?</Text>
        <Button
          isLoading={isResendingCode}
          onPress={onResendCode}
          testID="resendButton"
          variant="link">
          Reenviar
        </Button>
      </HStack>
    </Layouts.Internal>
  )
}
