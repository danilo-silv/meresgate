import { validateAuthCode, validateCNPJ, validatePassword, validatePhone } from './validators'

describe('validators.validateAuthCode', () => {
  test('the code must be valid', async () => {
    expect(validateAuthCode('123456')).toEqual(true)
  })

  test('the code must be invalid', async () => {
    expect(validateAuthCode('1234567')).toEqual('Código inválido')

    expect(validateAuthCode('12345')).toEqual('Código inválido')
  })

  test('the CNPJ must be valid', async () => {
    expect(validateCNPJ('25014805000115')).toEqual(true)
  })

  test('the CNPJ must be invalid', async () => {
    const items = new Array(10)

    items.forEach((_, index) => {
      expect(validateCNPJ(`${index}`.repeat(14))).toEqual('CNPJ inválido')
    })
  })

  test('the password must be valid', async () => {
    const passwordValidator = validatePassword('99999999@abC')

    const results = Object.entries(passwordValidator)

    results.forEach((result) => {
      expect(result[1]).toEqual(true)
    })
  })

  test('the password must be at least eight characters long', async () => {
    const passwordValidator = validatePassword('1234567')

    expect(passwordValidator['Minimo 8 caracteres']).toEqual(false)
  })

  test('the password must be a maximum fifteen characters', async () => {
    const passwordValidator = validatePassword('0123456789012345')

    expect(passwordValidator['Máximo 15 caracteres']).toEqual(false)
  })

  test('the password must be at least one capital letter', async () => {
    const passwordValidator = validatePassword('99999999@abc')

    expect(passwordValidator['Pelo menos 1 letra maiúscula']).toEqual(false)
  })

  test('the password must be at least one lowercase letter', async () => {
    const passwordValidator = validatePassword('99999999@ABC')

    expect(passwordValidator['Pelo menos 1 letra minúscula']).toEqual(false)
  })

  test('the password must have at least one sumbol', async () => {
    const passwordValidator = validatePassword('99999999abC')

    expect(passwordValidator['Pelo menos 1 símbolo']).toEqual(false)
  })

  test('the password must have at least one number', async () => {
    const passwordValidator = validatePassword('aaaaaaaa@abC')

    expect(passwordValidator['Pelo menos 1 número']).toEqual(false)
  })

  test('the phone number must be valid', async () => {
    expect(validatePhone('5544999999999')).toEqual(true)
  })

  test('the phone number must be invalid', async () => {
    expect(validatePhone('554499999999')).toEqual('Telefone inválido')

    expect(validatePhone('55449999999999')).toEqual('Telefone inválido')
  })
})
