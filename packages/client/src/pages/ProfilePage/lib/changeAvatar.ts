import { changeAvatarApi } from '../api'
import { yandexApi, ApiResponse, CommonErrorType } from '@shared/lib'
import { User } from '@entities/user'

export const changeAvatar = async (file: File): Promise<ApiResponse<User>> => {
  try {
    const user = await changeAvatarApi(file)

    if (!user) {
      return yandexApi.buildResponseError(CommonErrorType.UnknownError)
    }

    return yandexApi.buildResponseSuccess(user)
  } catch (error) {
    return yandexApi.handleError(error)
  }
}
