import { useCallback, useState } from 'react'

import Layouts from 'layouts'
import { Button, Center, FormControl, Input, Switch, Text, useTheme, VStack } from 'native-base'
import { RootStackScreenComponent } from 'navigation'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { Keyboard, Platform } from 'react-native'
import { CreateAccountPayload } from 'src/integration/resources/createAccount'

type FormData = Pick<CreateAccountPayload, 'firstName'>

export const CreateAccountFirstNameScreen: RootStackScreenComponent<'CreateAccountFirstName'> = ({
  navigation
}) => {
  const [isOng, setIsOng] = useState<boolean>(false)

  const { control, handleSubmit } = useForm<FormData>()

  const onSubmit = handleSubmit(
    useCallback<SubmitHandler<FormData>>(
      (data) => {
        Keyboard.dismiss()

        navigation.navigate('CreateAccountLastName', { ...data })
      },
      [navigation]
    )
  )

  const toggleSwitch = () => setIsOng(!isOng)

  const theme = useTheme()

  return (
    <Layouts.Internal typeTwo>
      <VStack space={75} alignItems="center" justifyContent="space-around">
        <Center alignItems="center" justifyContent="center" mt={6} mb={6}>
          <Text fontSize={14} color="#2B748E" bold>
            Vamos criar a sua conta! Insira o dado abaixo:
          </Text>
        </Center>
        <Center w="100%" alignItems="center" justifyContent="center">
          <Controller
            control={control}
            rules={{
              required: 'Digite seu Primerio Nome'
            }}
            render={({
              field: { onChange: onChangeText, onBlur, value },
              formState: { errors }
            }) => (
              <FormControl isInvalid={!!errors.firstName} isRequired>
                <Input
                  placeholder="Primeiro nome"
                  {...{ onChangeText, onBlur, value }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  enablesReturnKeyAutomatically
                  onSubmitEditing={onSubmit}
                  returnKeyType="next"
                  style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
                />
                {errors.firstName && (
                  <FormControl.ErrorMessage>{errors.firstName.message}</FormControl.ErrorMessage>
                )}
              </FormControl>
            )}
            name="firstName"
          />
        </Center>
        <Center w="100%">
          <Text style={{ fontSize: 14, color: '#2B748E' }}>
            Em caso de ONGs ou cuidadores autônomos, marcar a opção abaixo:
          </Text>
          <Switch
            size={Platform.OS === 'ios' ? 'sm' : 'md'}
            trackColor={{ false: '#767577', true: theme.colors.primary[100] }}
            thumbColor={isOng ? theme.colors.primary[600] : '#fff'}
            onValueChange={toggleSwitch}
            value={isOng}
          />
        </Center>
        <Center w="100%">
          <Button onPress={onSubmit} style={{ backgroundColor: '#2B748E', width: '100%' }}>
            <Text fontSize={12} color="white" bold>
              Confirmar Primeiro Nome
            </Text>
          </Button>
        </Center>
      </VStack>
    </Layouts.Internal>
  )
}
