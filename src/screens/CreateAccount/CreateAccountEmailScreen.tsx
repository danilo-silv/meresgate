import { useCallback } from 'react'

import Layouts from 'layouts'
import { Button, FormControl, Heading, Input } from 'native-base'
import { RootStackScreenComponent } from 'navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { CreateAccountPayload } from 'src/integration/resources/createAccount'

type FormData = Pick<CreateAccountPayload, 'email'>

export const CreateAccountEmailScreen: RootStackScreenComponent<'CreateAccountEmail'> = ({
  navigation,
  route
}) => {
  const { control, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit(
    useCallback<SubmitHandler<FormData>>(
      (data) => {
        Keyboard.dismiss()

        navigation.navigate('CreateAccountPhone', { ...data, ...route.params })
      },
      [navigation, route.params]
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
            <Heading>Digite seu e-mail</Heading>
            <Input
              {...{ onChangeText, onBlur, value }}
              autoCapitalize="none"
              autoCorrect={false}
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
        Confirmar e-mail
      </Button>
    </Layouts.External>
  )
}
