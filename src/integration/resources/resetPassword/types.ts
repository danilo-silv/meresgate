import { USER_STATUS } from '../auth'

export type SendEmailResetPasswordData = {
  message: string
}

export type SendEmailResetPasswordPayload = {
  email: string
}

export type PreResetPasswordData = {
  message: string
  status: USER_STATUS
}

export type PreResetPasswordPayload = {
  confirm_token: string
  id: string
  password: string
  password_confirmation: string
}

export type ResetPasswordData = {
  message: string
}

export type ResetPasswordPayload = Omit<PreResetPasswordPayload, 'confirm_token'> & {
  code: string
  slt: string
}
