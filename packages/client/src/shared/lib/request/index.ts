import axios, { isAxiosError } from 'axios'
import {
  ApiCode,
  ApiResponse,
  ApiResponseError,
  CommonErrorType,
  ErrorType,
  ResponseType,
} from './types'

const REQUEST_TIMEOUT = 10000

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

async function getRequest<T>(
  url: string,
  params?: Record<string, string | number | undefined | null>,
  headers?: Record<string, string | number | undefined>
): Promise<T | undefined> {
  const response = await api.get<T>(url, {
    ...(headers && { headers: { ...headers } }),
    timeout: REQUEST_TIMEOUT,
    params,
  })
  return response.data
}

export const buildResponseSuccess = <T>(data: T): ApiResponse<T> => {
  return { type: ResponseType.Success, data }
}

export const buildResponseError = <T extends string = CommonErrorType>(
  errorType: ErrorType<T>,
  message = '',
  code: number = ApiCode.UnknownError,
  cause?: T
): ApiResponseError<T> => {
  return { type: ResponseType.Error, errorType, message, code, cause }
}

async function postRequest<T, D = unknown>(
  url: string,
  data: D,
  headers?: Record<string, string | number | undefined>,
  signal?: AbortSignal
): Promise<T | undefined> {
  const response = await api.post<T>(url, data, {
    ...(headers && { headers: { ...headers } }),
    signal,
  })

  return response.data
}

async function putRequest<T, D = unknown>(
  url: string,
  data: D,
  headers?: Record<string, string | number | undefined>,
  signal?: AbortSignal
): Promise<T | undefined> {
  const response = await api.put<T>(url, data, {
    ...(headers && { headers: { ...headers } }),
    signal,
  })

  return response.data
}

function handleError(
  error: unknown,
  fallbackError = CommonErrorType.UnknownError
): ApiResponseError<CommonErrorType> {
  if (axios.isCancel(error)) {
    return buildResponseError(CommonErrorType.Cancelled)
  }

  if (!isAxiosError(error) || !error.response) {
    return buildResponseError(fallbackError)
  }

  const { status, data } = error.response
  const message = data?.Message || data

  if (status >= ApiCode.ServerError) {
    return buildResponseError(CommonErrorType.ServerError, message, status)
  }

  return buildResponseError(CommonErrorType.UnknownError, message, status)
}

export const Api = {
  getRequest,
  postRequest,
  putRequest,
  handleError,
  responseTypes: ResponseType,
  codes: ApiCode,
  buildResponseSuccess,
  buildResponseError,
}

//TODO убрать
//* как использовать
//* import { Api } from '@shared/lib'
//* const response = await Api.getRequest<type>(url, params, headers)
