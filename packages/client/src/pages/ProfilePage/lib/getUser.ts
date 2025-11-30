import { getUserApi } from '../api'
import { Api, ApiResponse, CommonErrorType } from '@shared/lib'
import { mapUserDtoToUser } from './mappers'
import { User } from '../../../entities/user'

export const getUser = async (): Promise<ApiResponse<User>> => {
  try {
    const user = await getUserApi()

    if (!user) {
      return Api.buildResponseError(CommonErrorType.UnknownError)
    }

    const mappedUser = mapUserDtoToUser(user)
    return Api.buildResponseSuccess(mappedUser)
  } catch (error) {
    return Api.handleError(error)
  }
}
