import { MaskService } from 'react-native-masked-text'

export const validateAuthCode = (value: string) => value.length === 6 || 'Código inválido'

export const validateCNPJ = (value: string) =>
  (MaskService.isValid('cnpj', value) && value !== '00000000000000') || 'CNPJ inválido'

export const validatePassword = (value: string) => ({
  'Minimo 8 caracteres': value ? value.length >= 8 : null,
  'Máximo 15 caracteres': value ? value.length <= 15 : null,
  'Pelo menos 1 letra maiúscula': value ? !!value.match(new RegExp('^(?=.*[A-Z]).*$')) : null,
  'Pelo menos 1 letra minúscula': value ? !!value.match(new RegExp('^(?=.*[a-z]).*$')) : null,
  'Pelo menos 1 símbolo': value ? !!value.match(new RegExp('^(?=.*[@#!$%^&+=]).*$')) : null,
  'Pelo menos 1 número': value ? !!value.match(new RegExp('^(?=.*[0-9]).*$')) : null
})

export const validatePhone = (value: string) =>
  MaskService.toRawValue('cel-phone', value).length === 13 || 'Telefone inválido'
