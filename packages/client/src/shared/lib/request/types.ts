export enum CommonErrorType {
  ServerError = 'ServerError',
  UnknownError = 'UnknownError',
  Cancelled = 'Cancelled',
}

export enum ApiCode {
  UnknownError = -1,
  ServerError = 500,
}

export enum ResponseType {
  Success = 'SUCCESS',
  Error = 'ERROR',
}

export type ErrorType<T extends string = never> = CommonErrorType | T

export type ApiResponseSuccess<T> = { type: ResponseType.Success; data: T }

export type ApiResponseError<T extends string = CommonErrorType> = {
  type: ResponseType.Error
  errorType: ErrorType<T>
  message: string
  code: number
  cause?: T
  data?: null
}

export type ApiResponse<T, P extends string = CommonErrorType> =
  | ApiResponseSuccess<T>
  | ApiResponseError<P>
