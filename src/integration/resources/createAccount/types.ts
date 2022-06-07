import { USER_STATUS } from '../auth'

export type CreateAccountData = {
  id: string
  status: USER_STATUS
}

export type CreateAccountPayload = {
  firstName: string
  lastName: string
  email: string
  password: string
  password_confirmation: string
  phone_number_cell: string
}

export type ConfirmAccountPhoneNumberData = {
  message: string
}

export type ConfirmAccountPhoneNumberPayload = Pick<CreateAccountData, 'id'> &
  Pick<CreateAccountPayload, 'email' | 'password'> & {
    code: string
    slt: string
  }

export type ConfirmAccountEmailData = {
  message: string
}

export type ConfirmAccountEmailPayload = {
  confirm_token: string
  id: string
}
