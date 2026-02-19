import { ApiResponse, CommonErrorType, yandexApi } from '@shared/lib'
import { forumLoginApi, getYandexServiceId, loginApi } from '../api'
import { DEFAULT_AUTH_ERROR } from '../model/consts'
import { Schema, YandexServiceIdResponse } from '../model/types'

export const login = async (data: Schema): Promise<ApiResponse<undefined>> => {
  try {
    await forumLoginApi(data)
    await loginApi(data)
    return yandexApi.buildResponseSuccess(undefined)
  } catch (error) {
    return yandexApi.handleError(error)
  }
}

export const requestYandexServiceId = async (
  redirectUri: string
): Promise<YandexServiceIdResponse> => {
  try {
    const response = await getYandexServiceId(redirectUri)
    if (!response?.service_id) {
      return yandexApi.buildResponseError(
        CommonErrorType.UnknownError,
        DEFAULT_AUTH_ERROR
      )
    }
    return yandexApi.buildResponseSuccess({ service_id: response.service_id })
  } catch (error) {
    return yandexApi.handleError(error)
  }
}
