import { AxiosError, AxiosResponse } from 'axios'
import { useMutation } from 'react-query'

import { ResponseError, ResponseSuccess } from '../../types'
import * as requests from './requests'
import { AuthData, AuthPayload, PreAuthData, PreAuthPayload } from './types'

export const usePreAuthMutation = () =>
  useMutation<
    AxiosResponse<ResponseSuccess<PreAuthData>>,
    AxiosError<ResponseError>,
    PreAuthPayload
  >(requests.preAuth)

export const useAuthMutation = () =>
  useMutation<AxiosResponse<ResponseSuccess<AuthData>>, AxiosError<ResponseError>, AuthPayload>(
    requests.auth
  )

export const useAcceptTermsMutation = () =>
  useMutation<AxiosResponse<ResponseSuccess<null>>[], AxiosError<ResponseError>>(
    requests.acceptTerms
  )
