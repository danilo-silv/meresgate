import { useCallback } from 'react'

import Layouts from 'layouts'
import { Button, Center, FormControl, Input, Text, VStack } from 'native-base'
import { RootStackScreenComponent } from 'navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Keyboard } from 'react-native'
import { CreateAccountPayload } from 'src/integration/resources/createAccount'

type FormData = Pick<CreateAccountPayload, 'lastName'>

export const CreateAccountLastNameScreen: RootStackScreenComponent<'CreateAccountLastName'> = ({
  navigation,
  route
}) => {
  const { control, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit(
    useCallback<SubmitHandler<FormData>>(
      (data) => {
        Keyboard.dismiss()

        navigation.navigate('CreateAccountEmail', { ...data, ...route.params })
      },
      [navigation, route.params]
    )
  )

  return (
    <Layouts.Internal typeTwo>
      <VStack space={40} alignItems="center" justifyContent="space-around">
        <Center alignItems="center" justifyContent="center" mt={6} mb={6}>
          <Text fontSize={14} color="#2B748E" bold>
            Agora insira o seu último nome:
          </Text>
        </Center>
        <Center w="100%" alignItems="center" justifyContent="center">
          <Controller
            control={control}
            rules={{
              required: 'Digite seu Último Nome'
            }}
            render={({
              field: { onChange: onChangeText, onBlur, value },
              formState: { errors }
            }) => (
              <FormControl isInvalid={!!errors.lastName} isRequired>
                <Input
                  placeholder="Último nome"
                  {...{ onChangeText, onBlur, value }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  enablesReturnKeyAutomatically
                  onSubmitEditing={onSubmit}
                  returnKeyType="next"
                  style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
                />
                {errors.lastName && (
                  <FormControl.ErrorMessage>{errors.lastName.message}</FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
            name="lastName"
          />
        </Center>
        <Center w="100%">
          <Button mt={2} onPress={onSubmit} style={{ backgroundColor: '#2B748E', width: '100%' }}>
            <Text fontSize={12} color="white" bold>
              Confirmar último Nome
            </Text>
          </Button>
        </Center>
      </VStack>
    </Layouts.Internal>
  )
}
