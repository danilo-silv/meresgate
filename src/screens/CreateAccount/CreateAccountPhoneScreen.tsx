import { useCallback } from 'react'

import Layouts from 'layouts'
import { Button, FormControl, Heading, Input } from 'native-base'
import { RootStackScreenComponent } from 'navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { MaskService } from 'react-native-masked-text'
import { CreateAccountPayload } from 'src/integration/resources/createAccount'
import { validatePhone } from 'src/utils/validators'

type FormData = Pick<CreateAccountPayload, 'phone_number_cell'>

export const CreateAccountPhoneScreen: RootStackScreenComponent<'CreateAccountPhone'> = ({
  navigation,
  route
}) => {
  const { control, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit(
    useCallback<SubmitHandler<FormData>>(
      (data) => {
        Keyboard.dismiss()

        navigation.navigate('CreateAccountCreatePassword', {
          phone_number_cell: MaskService.toRawValue('cel-phone', data.phone_number_cell),
          ...route.params
        })
      },
      [navigation, route.params]
    )
  )

  return (
    <Layouts.Internal typeTwo>
      <Controller
        control={control}
        rules={{
          required: 'Digite seu telefone',
          validate: validatePhone
        }}
        render={({ field: { onChange: onChangeText, onBlur, value }, formState: { errors } }) => (
          <FormControl isInvalid={!!errors.phone_number_cell} isRequired>
            <Heading>Digite seu telefone</Heading>
            <Input
              {...{
                onChangeText,
                onBlur,
                value: MaskService.toMask('cel-phone', value || '', {
                  maskType: 'BRL',
                  withDDD: true,
                  dddMask: '+55 (99) '
                })
              }}
              enablesReturnKeyAutomatically
              keyboardType="phone-pad"
              maxLength={19}
              onSubmitEditing={onSubmit}
              returnKeyType="next"
            />
            {errors.phone_number_cell && (
              <FormControl.ErrorMessage>
                {errors.phone_number_cell.message}
              </FormControl.ErrorMessage>
            )}
          </FormControl>
        )}
        name="phone_number_cell"
      />
      <Button mt={2} onPress={onSubmit}>
        Confirmar telefone
      </Button>
    </Layouts.Internal>
  )
}
