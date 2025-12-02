import { loginApi } from '../api'
import { Api, ApiResponse, CommonErrorType } from '@shared/lib'
import { Schema } from '../model/types'
import { DEFAULT_AUTH_ERROR } from '../model/consts'
import { isAxiosError } from 'axios'

export const login = async (data: Schema): Promise<ApiResponse<undefined>> => {
  try {
    await loginApi(data)
    return Api.buildResponseSuccess(undefined)
  } catch (error) {
    let reason = DEFAULT_AUTH_ERROR

    if (isAxiosError(error) && error.response?.data) {
      const data = error.response.data as { reason?: string }
      reason = data.reason || reason
    }

    return Api.buildResponseError(CommonErrorType.UnknownError, reason)
  }
}
