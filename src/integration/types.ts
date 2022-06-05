export type ResponseSuccess<T> = {
  data: T
  status: number
}

export type ResponseError = {
  errors: string[]
  status: number
}
