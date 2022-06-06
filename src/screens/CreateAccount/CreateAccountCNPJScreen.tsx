import { useCallback } from 'react'

import Layouts from 'layouts'
import { Button, FormControl, Heading, Input } from 'native-base'
import { RootStackScreenComponent } from 'navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { MaskService } from 'react-native-masked-text'
import { CreateAccountPayload } from 'src/integration/resources/createAccount'
import { validateCNPJ } from 'src/utils/validators'

type FormData = Pick<CreateAccountPayload, 'cnpj'>

export const CreateAccountCNPJScreen: RootStackScreenComponent<'CreateAccountCNPJ'> = ({
  navigation
}) => {
  const { control, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit(
    useCallback<SubmitHandler<FormData>>(
      (data) => {
        Keyboard.dismiss()

        navigation.navigate('CreateAccountEmail', {
          cnpj: MaskService.toRawValue('cnpj', data.cnpj)
        })
      },
      [navigation]
    )
  )

  return (
    <Layouts.Internal typeTwo>
      <Controller
        control={control}
        rules={{
          required: 'Digite seu cnpj',
          validate: validateCNPJ
        }}
        render={({ field: { onChange: onChangeText, onBlur, value }, formState: { errors } }) => (
          <FormControl isInvalid={!!errors.cnpj} isRequired>
            <Heading>Digite seu CNPJ</Heading>
            <Input
              {...{ onChangeText, onBlur, value: MaskService.toMask('cnpj', value || '') }}
              enablesReturnKeyAutomatically
              keyboardType="number-pad"
              maxLength={18}
              onSubmitEditing={onSubmit}
              returnKeyType="next"
            />
            {errors.cnpj && (
              <FormControl.ErrorMessage>{errors.cnpj.message}</FormControl.ErrorMessage>
            )}
          </FormControl>
        )}
        name="cnpj"
      />
      <Button mt={2} onPress={onSubmit}>
        Confirmar CNPJ
      </Button>
    </Layouts.Internal>
  )
}
