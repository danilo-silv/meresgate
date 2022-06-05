import Layouts from 'layouts'
import { Button, FormControl, Heading, HStack, Input, Switch, Text } from 'native-base'
import { RootStackScreenComponent } from 'navigation'
import { Controller } from 'react-hook-form'

import { handleInputPasswordFocus, refInputPassword, useLoginScreen } from './useLoginScreen'

export const LoginScreen: RootStackScreenComponent<'Login'> = ({ navigation }) => {
  const { control, goToResetPasswordSendEmailScreen, isLoading, setRememberEmail, submit } =
    useLoginScreen({ navigation })

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
              onSubmitEditing={handleInputPasswordFocus}
              returnKeyType="next"
            />
            {errors.email && (
              <FormControl.ErrorMessage>{errors.email.message}</FormControl.ErrorMessage>
            )}
          </FormControl>
        )}
        name="email"
      />
      <HStack alignItems="center" justifyContent="space-between">
        <Text opacity={0.5}>Lembrar meu e-mail</Text>
        <Switch defaultIsChecked onValueChange={setRememberEmail} />
      </HStack>
      <Controller
        control={control}
        rules={{
          required: 'Digite sua senha'
        }}
        render={({ field: { onChange: onChangeText, onBlur, value }, formState: { errors } }) => (
          <FormControl isInvalid={!!errors.password} isRequired>
            <Heading>Digite sua senha</Heading>
            <Input
              {...{ onChangeText, onBlur, value }}
              enablesReturnKeyAutomatically
              onSubmitEditing={submit}
              ref={refInputPassword}
              returnKeyType="go"
              type="password"
            />
            {errors.password && (
              <FormControl.ErrorMessage>{errors.password.message}</FormControl.ErrorMessage>
            )}
          </FormControl>
        )}
        name="password"
      />
      <Button isLoading={isLoading} onPress={submit}>
        Entrar
      </Button>
      <HStack alignItems="center">
        <Text>Esqueceu sua senha?</Text>
        <Button onPress={goToResetPasswordSendEmailScreen} variant="link">
          Redefinir senha
        </Button>
      </HStack>
    </Layouts.External>
  )
}
