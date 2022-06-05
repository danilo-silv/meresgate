import { createRef, FunctionComponent, useCallback, useMemo } from 'react'

import Layouts from 'layouts'
import { Button, FormControl, Heading, Input, Text } from 'native-base'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Keyboard, TextInput } from 'react-native'
import { validatePassword } from 'src/utils/validators'

type CreatePasswordScreenTemplateProps = {
  isSubmitting?: boolean
  submit(values: CreatePasswordFormData): void
}

export type CreatePasswordFormData = {
  password: string
  password_confirmation: string
}

const confirmPasswordInputRef = createRef<TextInput>()

const focusOnConfirmPasswordInput = () => confirmPasswordInputRef.current?.focus()

export const CreatePasswordScreenTemplate: FunctionComponent<CreatePasswordScreenTemplateProps> = ({
  isSubmitting,
  submit
}) => {
  const {
    control,

    handleSubmit,
    watch
  } = useForm<CreatePasswordFormData>()

  const passwordValue = watch('password')

  const passwordRules = useMemo(
    () =>
      Object.entries(validatePassword(passwordValue)).map((item) => (
        <Text
          {...(item[1] !== null
            ? { color: item[1] ? 'success.500' : 'error.500' }
            : { color: 'muted.500' })}
          fontSize="xs"
          key={item[0]}
          mt={2}>
          {item[0]}
        </Text>
      )),
    [passwordValue]
  )

  const onSubmit = handleSubmit(
    useCallback<SubmitHandler<CreatePasswordFormData>>(
      (formData) => {
        Keyboard.dismiss()

        submit(formData)
      },
      [submit]
    )
  )

  return (
    <Layouts.External>
      <Controller
        control={control}
        rules={{
          required: 'Digite sua senha'
        }}
        render={({ field: { onChange: onChangeText, onBlur, value }, formState: { errors } }) => (
          <FormControl isInvalid={!!errors.password} isRequired>
            <Heading>Escolha uma senha</Heading>
            <Input
              {...{ onChangeText, onBlur, value }}
              enablesReturnKeyAutomatically
              onSubmitEditing={focusOnConfirmPasswordInput}
              returnKeyType="next"
              type="password"
              testID="inputPassword"
            />
            {errors.password && (
              <FormControl.ErrorMessage>{errors.password.message}</FormControl.ErrorMessage>
            )}
            {passwordRules}
          </FormControl>
        )}
        name="password"
      />
      <Controller
        control={control}
        rules={{
          required: 'Digite sua senha',
          validate: (value) => value === passwordValue || 'As senhas são diferentes'
        }}
        render={({ field: { onChange: onChangeText, onBlur, value }, formState: { errors } }) => (
          <FormControl isInvalid={!!errors.password_confirmation} isRequired>
            <Heading>Confirme a senha</Heading>
            <Input
              {...{ onChangeText, onBlur, value }}
              enablesReturnKeyAutomatically
              onSubmitEditing={onSubmit}
              returnKeyType="next"
              ref={confirmPasswordInputRef}
              type="password"
              testID="inputConfirmPassword"
            />
            {errors.password_confirmation && (
              <FormControl.ErrorMessage>
                {errors.password_confirmation.message}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
        )}
        name="password_confirmation"
      />
      <Button isLoading={isSubmitting} mt={2} onPress={onSubmit} testID="confirmButton">
        Confirmar senha
      </Button>
    </Layouts.External>
  )
}
