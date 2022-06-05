import client from '../../client'
import { ResponseSuccess } from '../../types'
import {
  ConfirmAccountEmailData,
  ConfirmAccountEmailPayload,
  ConfirmAccountPhoneNumberData,
  ConfirmAccountPhoneNumberPayload,
  CreateAccountData,
  CreateAccountPayload
} from './types'

export const createAccount = (data: CreateAccountPayload) =>
  client.post<ResponseSuccess<CreateAccountData>>('v1/users', data)

export const confirmAccountPhoneNumber = ({ id, slt, ...data }: ConfirmAccountPhoneNumberPayload) =>
  client.patch<ResponseSuccess<ConfirmAccountPhoneNumberData>>(
    `v1/users/{id}/confirm-phone-number`,
    data,
    {
      headers: {
        'x-slt': slt
      }
    }
  )

export const confirmAccountEmail = ({ id, confirm_token, ...data }: ConfirmAccountEmailPayload) =>
  client.patch<ResponseSuccess<ConfirmAccountEmailData>>(
    `v1/users/${id}/confirm-email?confirm_token=${confirm_token}`,
    data
  )
