import { Api, ApiResponse, CommonErrorType } from '@shared/lib'
import { getUserRequest } from '../api'
import { User } from '../model/types'
import { mapUserDtoToUser } from './mappers'

export const getUser = async (): Promise<ApiResponse<User>> => {
  try {
    const user = await getUserRequest()

    if (!user) {
      return Api.buildResponseError(CommonErrorType.UnknownError)
    }

    const mappedUser = mapUserDtoToUser(user)
    return Api.buildResponseSuccess(mappedUser)
  } catch (error) {
    return Api.handleError(error)
  }
}
