import Layouts from 'layouts'
import {
  Button,
  FormControl,
  Heading,
  HStack,
  Image,
  Input,
  StatusBar,
  Switch,
  Text,
  View
} from 'native-base'
import { RootStackScreenComponent } from 'navigation'
import { Controller } from 'react-hook-form'
import { StyleSheet } from 'react-native'

import { handleInputPasswordFocus, refInputPassword, useLoginScreen } from './useLoginScreen'

export const LoginScreen: RootStackScreenComponent<'Login'> = ({ navigation }) => {
  const { control, goToResetPasswordSendEmailScreen, isLoading, setRememberEmail, submit } =
    useLoginScreen({ navigation })

  return (
    <>
      <StatusBar backgroundColor="#46CBD3" barStyle="light-content" />
      <Layouts.External>
        <Image
          alt="logo"
          style={styles.headerImage}
          source={require('../../../../assets/logo.png')}
        />
        <Controller
          control={control}
          rules={{
            required: 'E-mail'
          }}
          render={({ field: { onChange: onChangeText, onBlur, value }, formState: { errors } }) => (
            <FormControl isInvalid={!!errors.email} isRequired>
              <Heading style={{ color: '#2B748E', marginBottom: 10 }}>E-mail</Heading>
              <Input
                placeholder="digite seu e-mail..."
                {...{ onChangeText, onBlur, value }}
                autoCapitalize="none"
                autoCorrect={false}
                enablesReturnKeyAutomatically
                keyboardType="email-address"
                onSubmitEditing={handleInputPasswordFocus}
                returnKeyType="next"
                style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15 }}
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
          <Switch
            size="md"
            onTrackColor="blue.300"
            defaultIsChecked
            onValueChange={setRememberEmail}
          />
        </HStack>
        <Controller
          control={control}
          rules={{
            required: 'Digite sua senha'
          }}
          render={({ field: { onChange: onChangeText, onBlur, value }, formState: { errors } }) => (
            <FormControl isInvalid={!!errors.password} isRequired>
              <Heading style={{ color: '#2B748E', marginBottom: 10 }}>Digite sua senha</Heading>
              <Input
                placeholder="digite sua senha..."
                {...{ onChangeText, onBlur, value }}
                enablesReturnKeyAutomatically
                onSubmitEditing={submit}
                ref={refInputPassword}
                returnKeyType="go"
                type="password"
                style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15 }}
              />
              {errors.password && (
                <FormControl.ErrorMessage>{errors.password.message}</FormControl.ErrorMessage>
              )}
            </FormControl>
          )}
          name="password"
        />
        <Button
          isLoading={isLoading}
          onPress={submit}
          style={{ marginTop: 40, marginBottom: 20, backgroundColor: '#2B748E' }}>
          Entrar
        </Button>
        <HStack alignItems="center">
          <Text>Esqueceu sua senha?</Text>
          <Button onPress={goToResetPasswordSendEmailScreen} variant="link" size="md">
            Redefinir senha
          </Button>
        </HStack>
      </Layouts.External>
    </>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    width: 120,
    height: 120,
    alignSelf: 'center',
    marginBottom: 25
  }
})
