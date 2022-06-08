import { useCallback } from 'react'

import Layouts from 'layouts'
import { Button, Center, FormControl, Input, Text, VStack } from 'native-base'
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
    <Layouts.Internal typeTwo>
      <VStack space={20} alignItems="center" justifyContent="space-around">
        <Center alignItems="center" justifyContent="center" mt={6} mb={6}>
          <Text fontSize={14} color="#2B748E" bold>
            Informe um novo e-mail e logo após, verifique sua caixa de entrada!
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
                <Text fontSize={22} bold mb={4}>
                  Alterar e-mail
                </Text>

                <Input
                  {...{ onChangeText, onBlur, value }}
                  placeholder="Novo Email"
                  autoCapitalize="none"
                  enablesReturnKeyAutomatically
                  keyboardType="email-address"
                  onSubmitEditing={onSubmit}
                  returnKeyType="next"
                  style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 14, height: 51 }}
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
              Alterar
            </Text>
          </Button>
        </Center>
      </VStack>
    </Layouts.Internal>
  )
}
