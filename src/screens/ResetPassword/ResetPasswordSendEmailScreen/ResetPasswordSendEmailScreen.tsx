import Layouts from 'layouts'
import { Button, FormControl, Heading, Input } from 'native-base'
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
      <Button isLoading={sendEmailResetPasswordMutation.isLoading} mt={2} onPress={submit}>
        Redefinir senha
      </Button>
    </Layouts.External>
  )
}
