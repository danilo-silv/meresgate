import { act, fireEvent, render } from 'test-utils'

import { DefaultBottomSheetFeedback } from './DefaultBottomSheetFeedback'

describe('DefaultBottomSheetFeedback', () => {
  const [buttonDescription, close, description, title] = [
    'My button',
    jest.fn(),
    'My description',
    'My title'
  ]

  test('renders correctly', async () => {
    const { queryByText } = render(
      <DefaultBottomSheetFeedback {...{ buttonDescription, close, description, title }} />
    )

    expect(queryByText(buttonDescription)).toBeTruthy()

    expect(queryByText(description)).toBeTruthy()

    expect(queryByText(title)).toBeTruthy()
  })

  test('default button description must be OK', async () => {
    const { queryByText } = render(
      <DefaultBottomSheetFeedback {...{ close, description, title }} />
    )

    expect(queryByText('OK')).toBeTruthy()
  })

  test('must call close prop', async () => {
    const { getByTestId } = render(
      <DefaultBottomSheetFeedback {...{ buttonDescription, close, description, title }} />
    )

    await act(async () => {
      fireEvent.press(getByTestId('closeButton'))
    })

    expect(close).toBeCalled()
  })
})
