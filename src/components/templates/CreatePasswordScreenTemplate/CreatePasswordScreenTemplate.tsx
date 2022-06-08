import { createRef, FunctionComponent, useCallback, useMemo } from 'react'

import Layouts from 'layouts'
import { Button, Center, FormControl, Input, ScrollView, Text, VStack } from 'native-base'
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
    <ScrollView showsVerticalScrollIndicator={false}>
      <Layouts.Internal typeTwo>
        <VStack space={10} alignItems="center" justifyContent="space-around">
          <Center alignItems="center" justifyContent="center" mt={6} mb={6}>
            <Text fontSize={14} color="#2B748E" bold>
              Seguindo as instruções abaixo, crie uma senha forte para a sua conta:
            </Text>
          </Center>
          <Center w="100%" alignItems="center" justifyContent="center">
            <Controller
              control={control}
              rules={{
                required: 'Digite sua senha'
              }}
              render={({
                field: { onChange: onChangeText, onBlur, value },
                formState: { errors }
              }) => (
                <FormControl isInvalid={!!errors.password} isRequired>
                  <Text fontSize={20}>Escolha uma senha</Text>
                  <Input
                    {...{ onChangeText, onBlur, value }}
                    enablesReturnKeyAutomatically
                    onSubmitEditing={focusOnConfirmPasswordInput}
                    returnKeyType="next"
                    type="password"
                    testID="inputPassword"
                    style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
                  />
                  {errors.password && (
                    <FormControl.ErrorMessage>{errors.password.message}</FormControl.ErrorMessage>
                  )}
                  {passwordRules}
                </FormControl>
              )}
              name="password"
            />
          </Center>
          <Center w="100%" alignItems="center" justifyContent="center">
            <Controller
              control={control}
              rules={{
                required: 'Digite sua senha',
                validate: (value) => value === passwordValue || 'As senhas são diferentes'
              }}
              render={({
                field: { onChange: onChangeText, onBlur, value },
                formState: { errors }
              }) => (
                <FormControl isInvalid={!!errors.password_confirmation} isRequired>
                  <Text fontSize={20}>Confirme a senha</Text>
                  <Input
                    {...{ onChangeText, onBlur, value }}
                    enablesReturnKeyAutomatically
                    onSubmitEditing={onSubmit}
                    returnKeyType="next"
                    ref={confirmPasswordInputRef}
                    type="password"
                    testID="inputConfirmPassword"
                    style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
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
          </Center>
          <Center w="100%">
            <Button
              isLoading={isSubmitting}
              mt={2}
              onPress={onSubmit}
              testID="confirmButton"
              style={{ backgroundColor: '#2B748E', width: '100%' }}>
              <Text fontSize={12} color="white" bold>
                Confirmar senha
              </Text>
            </Button>
          </Center>
        </VStack>
      </Layouts.Internal>
    </ScrollView>
  )
}
