import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'

import { ResponseError, ResponseSuccess } from '../../types'
import * as requests from './requests'
import {
  ConfirmAccountEmailData,
  ConfirmAccountEmailPayload,
  ConfirmAccountPhoneNumberData,
  ConfirmAccountPhoneNumberPayload,
  CreateAccountData,
  CreateAccountPayload
} from './types'

export const useCreateAccountMutation = () =>
  useMutation<
    AxiosResponse<ResponseSuccess<CreateAccountData>>,
    AxiosError<ResponseError>,
    CreateAccountPayload
  >(requests.createAccount)

export const useConfirmAccountPhoneNumberMutation = () =>
  useMutation<
    AxiosResponse<ResponseSuccess<ConfirmAccountPhoneNumberData>>,
    AxiosError<ResponseError>,
    ConfirmAccountPhoneNumberPayload
  >(requests.confirmAccountPhoneNumber)

export const useConfirmAccountEmailMutation = () =>
  useMutation<
    AxiosResponse<ResponseSuccess<ConfirmAccountEmailData>>,
    AxiosError<ResponseError>,
    ConfirmAccountEmailPayload
  >(requests.confirmAccountEmail)
