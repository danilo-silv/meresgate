import client from '../../client'
import { ResponseSuccess } from '../../types'
import {
  SendEmailResetPasswordData,
  SendEmailResetPasswordPayload,
  PreResetPasswordData,
  PreResetPasswordPayload,
  ResetPasswordData,
  ResetPasswordPayload
} from './types'

export const sendEmailResetPassword = (data: SendEmailResetPasswordPayload) =>
  client.post<ResponseSuccess<SendEmailResetPasswordData>>('v1/users/reset-password', data)

export const preResetPassword = ({ confirm_token, id, ...data }: PreResetPasswordPayload) =>
  client.patch<ResponseSuccess<PreResetPasswordData>>(
    `v1/users/${id}/pre-reset-password?confirm_token=${confirm_token}`,
    data
  )

export const resetPassword = ({ id, slt, ...data }: ResetPasswordPayload) =>
  client.patch<ResponseSuccess<ResetPasswordData>>(`v1/users/${id}/reset-password`, data, {
    headers: {
      'x-slt': slt
    }
  })
