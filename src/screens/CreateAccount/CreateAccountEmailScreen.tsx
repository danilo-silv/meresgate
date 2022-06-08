import { useCallback } from 'react'

import Layouts from 'layouts'
import { Button, Center, FormControl, Input, Text, VStack } from 'native-base'
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
    <Layouts.Internal typeTwo>
      <VStack space={40} alignItems="center" justifyContent="space-around">
        <Center alignItems="center" justifyContent="center" mt={6} mb={6}>
          <Text fontSize={14} color="#2B748E" bold>
            Agora, você deve adicionar o seu e-mail:
          </Text>
        </Center>
        <Center w="100%" alignItems="center" justifyContent="center">
          <Controller
            control={control}
            rules={{
              required: 'Digite seu e-mail'
            }}
            render={({
              field: { onChange: onChangeText, onBlur, value },
              formState: { errors }
            }) => (
              <FormControl isInvalid={!!errors.email} isRequired>
                <Input
                  placeholder="E-mail"
                  {...{ onChangeText, onBlur, value }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  enablesReturnKeyAutomatically
                  keyboardType="email-address"
                  onSubmitEditing={onSubmit}
                  returnKeyType="next"
                  style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
                />
                {errors.email && (
                  <FormControl.ErrorMessage>{errors.email.message}</FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
            name="email"
          />
        </Center>
        <Center w="100%">
          <Button mt={2} onPress={onSubmit} style={{ backgroundColor: '#2B748E', width: '100%' }}>
            <Text fontSize={12} color="white" bold>
              Confirmar E-mail
            </Text>
          </Button>
        </Center>
      </VStack>
    </Layouts.Internal>
  )
}
