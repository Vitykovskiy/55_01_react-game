import { getYandexServiceId, loginApi } from '../api'
import { Api, ApiResponse, CommonErrorType } from '@shared/lib'
import { Schema, YandexServiceIdResponse } from '../model/types'
import { DEFAULT_AUTH_ERROR } from '../model/consts'

export const login = async (data: Schema): Promise<ApiResponse<undefined>> => {
  try {
    await loginApi(data)
    return Api.buildResponseSuccess(undefined)
  } catch (error) {
    return Api.handleError(error)
  }
}

export const requestYandexServiceId = async (
  redirectUri: string
): Promise<YandexServiceIdResponse> => {
  try {
    const response = await getYandexServiceId(redirectUri)
    if (!response?.service_id) {
      return Api.buildResponseError(
        CommonErrorType.UnknownError,
        DEFAULT_AUTH_ERROR
      )
    }
    return Api.buildResponseSuccess({ service_id: response.service_id })
  } catch (error) {
    return Api.handleError(error)
  }
}
