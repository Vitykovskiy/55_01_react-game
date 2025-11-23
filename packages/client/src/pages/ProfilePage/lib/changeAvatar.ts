import { changeAvatarApi } from '../api'
import { Api, ApiResponse, CommonErrorType } from '@shared/lib'
import { User } from '../model/types'

export const changeAvatar = async (file: File): Promise<ApiResponse<User>> => {
  try {
    const avatar = await changeAvatarApi(file)

    if (!avatar) {
      return Api.buildResponseError(CommonErrorType.UnknownError)
    }

    return Api.buildResponseSuccess(avatar)
  } catch (error) {
    return Api.handleError(error)
  }
}
