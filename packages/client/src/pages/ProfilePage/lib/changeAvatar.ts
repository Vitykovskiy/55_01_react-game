import { changeAvatarApi } from '../api'
import { Api, ApiResponse, CommonErrorType } from '@shared/lib'
import { User } from '../model/types'

export const changeAvatar = async (file: File): Promise<ApiResponse<User>> => {
  try {
    const user = await changeAvatarApi(file)

    if (!user) {
      return Api.buildResponseError(CommonErrorType.UnknownError)
    }

    return Api.buildResponseSuccess(user)
  } catch (error) {
    return Api.handleError(error)
  }
}
