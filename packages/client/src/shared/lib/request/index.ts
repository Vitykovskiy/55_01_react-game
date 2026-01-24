import axios, { isAxiosError } from 'axios'
import { BASE_URL } from '../../config'
import {
  ApiCode,
  ApiResponse,
  ApiResponseError,
  CommonErrorType,
  ErrorType,
  ResponseType,
} from './types'
import { SERVER_HOST } from './consts'

const REQUEST_TIMEOUT = 10000

const buildResponseSuccess = <T>(data: T): ApiResponse<T> => {
  return { type: ResponseType.Success, data }
}

const buildResponseError = <T extends string = CommonErrorType>(
  errorType: ErrorType<T>,
  message = '',
  code: number = ApiCode.UnknownError,
  cause?: T
): ApiResponseError<T> => {
  return { type: ResponseType.Error, errorType, message, code, cause }
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

export const createApi = (baseURL: string) => {
  const api = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  })

  const getRequest = async <T>(
    url: string,
    params?: Record<string, string | number | undefined | null>,
    headers?: Record<string, string | number | undefined>
  ): Promise<T | undefined> => {
    const response = await api.get<T>(url, {
      ...(headers && { headers: { ...headers } }),
      timeout: REQUEST_TIMEOUT,
      params,
    })
    return response.data
  }

  const postRequest = async <T, D = unknown>(
    url: string,
    data: D,
    headers?: Record<string, string | number | undefined>,
    signal?: AbortSignal
  ): Promise<T | undefined> => {
    const response = await api.post<T>(url, data, {
      ...(headers && { headers: { ...headers } }),
      signal,
    })

    return response.data
  }

  const putRequest = async <T, D = unknown>(
    url: string,
    data: D,
    headers?: Record<string, string | number | undefined>,
    signal?: AbortSignal
  ): Promise<T | undefined> => {
    const response = await api.put<T>(url, data, {
      ...(headers && { headers: { ...headers } }),
      signal,
    })

    return response.data
  }

  const deleteRequest = async <T, D = unknown>(
    url: string,
    data?: D,
    headers?: Record<string, string | number | undefined>,
    signal?: AbortSignal
  ): Promise<T | undefined> => {
    const response = await api.delete<T>(url, {
      ...(headers && { headers: { ...headers } }),
      ...(data !== undefined && { data }),
      signal,
    })

    return response.data
  }

  return {
    getRequest,
    postRequest,
    putRequest,
    deleteRequest,
    handleError,
    responseTypes: ResponseType,
    codes: ApiCode,
    buildResponseSuccess,
    buildResponseError,
  }
}

export const yandexApi = createApi(BASE_URL)
export const serverApi = createApi(SERVER_HOST)

//TODO убрать
//* как использовать
//* import { Api } from '@shared/lib'
//* const response = await Api.getRequest<type>(url, params, headers)
