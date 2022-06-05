import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'

import { ResponseError, ResponseSuccess } from '../../types'
import * as requests from './requests'
import {
  PreResetPasswordData,
  PreResetPasswordPayload,
  ResetPasswordData,
  ResetPasswordPayload,
  SendEmailResetPasswordData,
  SendEmailResetPasswordPayload
} from './types'

export const useSendEmailResetPasswordMutation = () =>
  useMutation<
    AxiosResponse<ResponseSuccess<SendEmailResetPasswordData>>,
    AxiosError<ResponseError>,
    SendEmailResetPasswordPayload
  >(requests.sendEmailResetPassword)

export const usePreResetPasswordMutation = () =>
  useMutation<
    AxiosResponse<ResponseSuccess<PreResetPasswordData>>,
    AxiosError<ResponseError>,
    PreResetPasswordPayload
  >(requests.preResetPassword)

export const useResetPasswordMutation = () =>
  useMutation<
    AxiosResponse<ResponseSuccess<ResetPasswordData>>,
    AxiosError<ResponseError>,
    ResetPasswordPayload
  >(requests.resetPassword)
