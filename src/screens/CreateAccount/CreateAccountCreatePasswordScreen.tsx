import { useCallback } from 'react'

import { RootStackScreenComponent } from 'navigation'
import { CreatePasswordFormData } from 'src/components/templates/CreatePasswordScreenTemplate/CreatePasswordScreenTemplate'
import { useBottomSheetContext } from 'src/contexts/BottomSheetContext'
import { useCreateAccountMutation } from 'src/integration/resources/createAccount'
import Templates from 'templates'

export const CreateAccountCreatePasswordScreen: RootStackScreenComponent<
  'CreateAccountCreatePassword'
> = ({ navigation, route }) => {
  const createAccountMutation = useCreateAccountMutation()

  const bottomSheetContext = useBottomSheetContext()

  const submit = useCallback(
    (formData: CreatePasswordFormData) => {
      createAccountMutation.mutate(
        {
          ...formData,
          ...route.params
        },
        {
          onError: () =>
            bottomSheetContext.open({
              description:
                'Uma ou mais informações que você forneceu não puderam ser confirmados. Realize seu cadastro novamente.',
              title: 'Erro no cadastro'
            }),
          onSuccess: (responseData) =>
            navigation.reset({
              index: 0,
              routes: [
                {
                  name: 'CreateAccountAuthCode',
                  params: {
                    id: responseData.data.data.id,
                    slt: responseData.headers['x-slt'],
                    email: route.params.email,
                    password: formData.password
                  }
                }
              ]
            })
        }
      )
    },
    [createAccountMutation, bottomSheetContext, navigation, route.params]
  )

  return (
    <Templates.CreatePasswordScreen
      isSubmitting={createAccountMutation.isLoading}
      submit={submit}
    />
  )
}
