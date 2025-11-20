import { changeAvatarApi } from '../api'
import { Api } from '@shared/lib'
import { ApiResponse } from '@shared/lib/request/types'
import { User } from '@pages/ProfilePage/model/types'

export const changeAvatar = async (
  file: File
): Promise<ApiResponse<User | undefined>> => {
  try {
    const avatar = await changeAvatarApi(file)
    return Api.buildResponseSuccess(avatar)
  } catch (error) {
    return Api.handleError(error)
  }
}
