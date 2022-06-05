import client from '../../client'
import { ResponseSuccess } from '../../types'
import { AuthData, AuthPayload, PreAuthData, PreAuthPayload } from './types'

export const preAuth = (data: PreAuthPayload) =>
  client.post<ResponseSuccess<PreAuthData>>('v1/pre-auth', data)

export const auth = ({ slt, ...data }: AuthPayload) =>
  client.post<ResponseSuccess<AuthData>>('v1/auth', data, {
    headers: {
      'x-slt': slt
    }
  })

export const acceptTerms = async () => {
  const commitmentResponse = await client.patch<ResponseSuccess<null>>('v1/users/me/term/1/accept')

  const responsibilityResponse = await client.patch<ResponseSuccess<null>>(
    'v1/users/me/term/2/accept'
  )

  return [commitmentResponse, responsibilityResponse]
}
