import { yandexOauthSignInApi } from '../api'
import { yandexApi, ApiResponse, CommonErrorType } from '@shared/lib'
import { isAxiosError } from 'axios'
import { DEFAULT_YANDEX_OAUTH_ERROR } from '../model/consts'

export const yandexOauthSignIn = async (
  code: string,
  redirectUri: string
): Promise<ApiResponse<undefined>> => {
  try {
    await yandexOauthSignInApi(code, redirectUri)
    return yandexApi.buildResponseSuccess(undefined)
  } catch (error) {
    let reason = DEFAULT_YANDEX_OAUTH_ERROR
    if (isAxiosError(error) && error.response?.data) {
      const data = error.response.data as { reason?: string }
      reason = data.reason || reason
    }
    return yandexApi.buildResponseError(CommonErrorType.UnknownError, reason)
  }
}
