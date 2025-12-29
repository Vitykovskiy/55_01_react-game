import { Api, ApiResponse, CommonErrorType } from '@shared/lib'
import { mapUserDtoToUser } from '../lib/mappers'
import { User, UserDto } from '../model/types'

const getUserApi = (): Promise<UserDto | undefined> => {
  return Api.getRequest<UserDto | undefined>('auth/user')
}

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
