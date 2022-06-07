import { Icons } from 'atoms'
import Layouts from 'layouts'
import { Box, Button, FormControl, HStack, Input, ScrollView, Switch, Text } from 'native-base'
import { RootStackScreenComponent } from 'navigation'
import { Controller } from 'react-hook-form'
import { Platform, StyleSheet } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { handleInputPasswordFocus, refInputPassword, useLoginScreen } from './useLoginScreen'

export const LoginScreen: RootStackScreenComponent<'Login'> = ({ navigation }) => {
  const { control, goToResetPasswordSendEmailScreen, isLoading, setRememberEmail, submit } =
    useLoginScreen({ navigation })

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Layouts.Internal>
        <HStack alignItems="center" justifyContent="center" mb={6}>
          <Text fontSize={15} color="#2B748E">
            Faça Login
          </Text>
        </HStack>
        <Controller
          control={control}
          rules={{
            required: 'E-mail'
          }}
          render={({ field: { onChange: onChangeText, onBlur, value }, formState: { errors } }) => (
            <FormControl isInvalid={!!errors.email} isRequired>
              <Input
                placeholder="Email"
                {...{ onChangeText, onBlur, value }}
                autoCapitalize="none"
                autoCorrect={false}
                enablesReturnKeyAutomatically
                keyboardType="email-address"
                onSubmitEditing={handleInputPasswordFocus}
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
        <HStack alignItems="center" justifyContent="space-between" mb={3} mt={3}>
          <Text opacity={0.5} fontSize={12}>
            Lembrar meu e-mail
          </Text>
          <Switch
            size={Platform.OS === 'ios' ? 'sm' : 'md'}
            onTrackColor="#2B748E"
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
              <Input
                placeholder="digite sua senha..."
                {...{ onChangeText, onBlur, value }}
                enablesReturnKeyAutomatically
                onSubmitEditing={submit}
                ref={refInputPassword}
                returnKeyType="go"
                type="password"
                style={{ backgroundColor: 'white', opacity: 0.9, fontSize: 15, height: 51 }}
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
          <Text fontSize={12}>Esqueceu sua senha?</Text>
          <Button onPress={goToResetPasswordSendEmailScreen} variant="link" size="sm">
            Redefinir senha
          </Button>
        </HStack>

        <HStack alignItems="center" justifyContent="center" mt={15} mb={22}>
          <Text textAlign="center" fontSize={15}>
            Ou continue com
          </Text>
        </HStack>

        <Box pl="100" pr="100">
          <HStack alignItems="center" justifyContent="space-around" mb={50}>
            {Platform.OS === 'android' && (
              <TouchableOpacity style={styles.socialButton}>
                <Icons.Google size={30} />
              </TouchableOpacity>
            )}
            {Platform.OS === 'ios' && (
              <TouchableOpacity style={styles.socialButton}>
                <Icons.Apple size={30} />
              </TouchableOpacity>
            )}
            <TouchableOpacity style={styles.socialButton}>
              <Icons.Facebook size={30} />
            </TouchableOpacity>
          </HStack>
        </Box>
      </Layouts.Internal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  socialButton: {
    backgroundColor: '#f8f7f7',
    height: 52,
    width: 52,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 11,
    borderRadius: 50
  }
})
