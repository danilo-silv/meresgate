import { useCallback } from 'react'

import Layouts from 'layouts'
import { Button, Center, FormControl, Input, Text, VStack } from 'native-base'
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
      <VStack space={40} alignItems="center" justifyContent="space-around">
        <Center alignItems="center" justifyContent="center" mt={6} mb={6}>
          <Text fontSize={14} color="#2B748E" bold>
            Vamos criar a sua conta! Insira o dado abaixo:
          </Text>
        </Center>
        <Center w="100%" alignItems="center" justifyContent="center">
          <Controller
            control={control}
            rules={{
              required: 'Digite o Número de celular',
              validate: validatePhone
            }}
            render={({
              field: { onChange: onChangeText, onBlur, value },
              formState: { errors }
            }) => (
              <FormControl isInvalid={!!errors.phone_number_cell} isRequired>
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
                  placeholder="Número de celular"
                  enablesReturnKeyAutomatically
                  keyboardType="phone-pad"
                  maxLength={19}
                  onSubmitEditing={onSubmit}
                  returnKeyType="next"
                  style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
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
        </Center>
        <Center w="100%">
          <Button mt={2} onPress={onSubmit} style={{ backgroundColor: '#2B748E', width: '100%' }}>
            <Text fontSize={12} color="white" bold>
              Confirmar Telefone
            </Text>
          </Button>
        </Center>
      </VStack>
    </Layouts.Internal>
  )
}
