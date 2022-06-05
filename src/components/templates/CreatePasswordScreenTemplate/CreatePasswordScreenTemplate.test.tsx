import { act, fireEvent, render } from 'test-utils'

import { CreatePasswordScreenTemplate } from './CreatePasswordScreenTemplate'

describe('CreatePasswordScreenTemplate', () => {
  test('renders correctly', async () => {
    const { queryByText } = render(
      <CreatePasswordScreenTemplate isSubmitting={false} submit={() => {}} />
    )

    expect(queryByText('Escolha uma senha')).toBeTruthy()

    expect(queryByText('Confirme a senha')).toBeTruthy()

    expect(queryByText('Confirmar senha')).toBeTruthy()
  })

  test("password input and confirm password can't be empty", async () => {
    const { getByTestId, queryAllByText } = render(
      <CreatePasswordScreenTemplate isSubmitting={false} submit={() => {}} />
    )

    await act(async () => {
      fireEvent.press(getByTestId('confirmButton'))
    })

    expect(queryAllByText('Digite sua senha').length).toEqual(2)
  })

  test("password input and confirm password can't be different", async () => {
    const { getByTestId, queryByText } = render(
      <CreatePasswordScreenTemplate isSubmitting={false} submit={() => {}} />
    )

    fireEvent.changeText(getByTestId('inputPassword'), '111111')

    fireEvent.changeText(getByTestId('inputConfirmPassword'), '222222')

    await act(async () => {
      fireEvent.press(getByTestId('confirmButton'))
    })

    expect(queryByText('As senhas são diferentes')).toBeTruthy()
  })

  test('must call submit prop', async () => {
    const submit = jest.fn()

    const { getByTestId } = render(
      <CreatePasswordScreenTemplate isSubmitting={false} submit={submit} />
    )

    fireEvent.changeText(getByTestId('inputPassword'), '123456')

    fireEvent.changeText(getByTestId('inputConfirmPassword'), '123456')

    await act(async () => {
      fireEvent.press(getByTestId('confirmButton'))
    })

    expect(submit).toBeCalled()
  })

  test('button loader must be visible', async () => {
    const { getByA11yLabel } = render(
      <CreatePasswordScreenTemplate isSubmitting submit={() => {}} />
    )

    const loaders = getByA11yLabel('loading')

    expect(loaders).toBeTruthy()
  })
})
