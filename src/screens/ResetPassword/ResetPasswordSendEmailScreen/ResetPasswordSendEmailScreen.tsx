import Layouts from 'layouts'
import { Button, Center, FormControl, Input, Text, VStack } from 'native-base'
import { RootStackScreenComponent } from 'navigation'
import { Controller } from 'react-hook-form'

import { useResetPasswordSendEmailScreen } from './useResetPasswordSendEmailScreen'

export const ResetPasswordSendEmailScreen: RootStackScreenComponent<'ResetPasswordSendEmail'> = ({
  navigation
}) => {
  const { control, sendEmailResetPasswordMutation, submit } = useResetPasswordSendEmailScreen({
    navigation
  })

  return (
    <Layouts.Internal typeTwo>
      <VStack space={20} alignItems="center" justifyContent="space-around">
        <Center alignItems="center" justifyContent="center">
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
                  Digite seu E-mail
                </Text>
                <Input
                  {...{ onChangeText, onBlur, value }}
                  autoCapitalize="none"
                  autoCorrect={false}
                  enablesReturnKeyAutomatically
                  keyboardType="email-address"
                  onSubmitEditing={submit}
                  returnKeyType="next"
                />
                {errors.email && (
                  <FormControl.ErrorMessage>{errors.email.message}</FormControl.ErrorMessage>
                )}
                <FormControl.HelperText>
                  Você receberá um e-mail com um link para redefinição de senha.
                </FormControl.HelperText>
              </FormControl>
            )}
            name="email"
          />
        </Center>
        <Center w="100%">
          <Button
            isLoading={sendEmailResetPasswordMutation.isLoading}
            style={{ backgroundColor: '#2B748E', width: '100%' }}
            onPress={submit}>
            <Text fontSize={12} color="white" bold>
              Alterar
            </Text>
          </Button>
        </Center>
      </VStack>
    </Layouts.Internal>
  )
}
