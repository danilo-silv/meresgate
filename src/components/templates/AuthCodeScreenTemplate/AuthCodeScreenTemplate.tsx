import { FunctionComponent, useCallback } from 'react'

import Layouts from 'layouts'
import { Button, Center, FormControl, HStack, Input, Text, VStack } from 'native-base'
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
      <VStack space={20} alignItems="center" justifyContent="space-around">
        <Center alignItems="center" justifyContent="center" mt={6} mb={6}>
          <Text fontSize={14} color="#2B748E" bold>
            Confirme o seu número de contato através da autenticação abaixo:
          </Text>
        </Center>
        <Center w="100%" alignItems="center" justifyContent="center">
          <Controller
            control={control}
            rules={{
              required: 'Digite seu código',
              validate: validateAuthCode
            }}
            render={({
              field: { onChange: onChangeText, onBlur, value },
              formState: { errors }
            }) => (
              <FormControl isInvalid={!!errors.code} isRequired>
                <Text fontSize={24} bold>
                  Autenticação
                </Text>
                <Text mb={4} mt={4}>
                  Enviamos por sms um código de 6 dígitos. Digite-o abaixo:
                </Text>
                <Input
                  {...{ onChangeText, onBlur, value }}
                  enablesReturnKeyAutomatically
                  keyboardType="number-pad"
                  maxLength={6}
                  onSubmitEditing={onSubmit}
                  returnKeyType="next"
                  testID="inputCode"
                  style={{
                    backgroundColor: 'white',
                    opacity: 0.9,
                    fontSize: 22,
                    height: 51,
                    textAlign: 'center',
                    letterSpacing: 24
                  }}
                />
                {errors.code && (
                  <FormControl.ErrorMessage>{errors.code.message}</FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
            name="code"
          />
        </Center>
        <Center w="100%">
          <Button
            isLoading={isSubmitting}
            mt={10}
            mb={10}
            onPress={onSubmit}
            testID="confirmButton"
            style={{ backgroundColor: '#2B748E', width: '100%' }}>
            <Text fontSize={12} color="white" bold>
              Confirmar
            </Text>
          </Button>
        </Center>
        <Center w="100%">
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
        </Center>
      </VStack>
    </Layouts.Internal>
  )
}
