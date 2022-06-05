import { useCallback } from 'react'

import Layouts from 'layouts'
import { Button, FormControl, Heading, Input, Text } from 'native-base'
import { RootStackScreenComponent } from 'navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'

type FormData = {
  email: string
}

export const CreateAccountChangeEmailScreen: RootStackScreenComponent<
  'CreateAccountChangeEmail'
> = ({ navigation }) => {
  const { control, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit(
    useCallback<SubmitHandler<FormData>>(
      (data) => {
        Keyboard.dismiss()

        navigation.goBack()
      },
      [navigation]
    )
  )

  return (
    <Layouts.External>
      <Controller
        control={control}
        rules={{
          required: 'Digite seu e-mail'
        }}
        render={({ field: { onChange: onChangeText, onBlur, value }, formState: { errors } }) => (
          <FormControl isInvalid={!!errors.email} isRequired>
            <Heading>Alterar e-mail</Heading>
            <Text>E-mail atual: me@myemail.com.br</Text>
            <Input
              {...{ onChangeText, onBlur, value }}
              autoCapitalize="none"
              enablesReturnKeyAutomatically
              keyboardType="email-address"
              onSubmitEditing={onSubmit}
              returnKeyType="next"
            />
            {errors.email && (
              <FormControl.ErrorMessage>{errors.email.message}</FormControl.ErrorMessage>
            )}
          </FormControl>
        )}
        name="email"
      />
      <Button mt={2} onPress={onSubmit}>
        Alterar
      </Button>
    </Layouts.External>
  )
}
