import { Api } from '@shared/lib'
import { ApiResponse } from '@shared/lib/request/types'
import { getUserApi } from '../api'
import { User } from '../model/types'

export const getUser = async (): Promise<ApiResponse<User | undefined>> => {
  try {
    const user = await getUserApi()
    return Api.buildResponseSuccess(user)
  } catch (error) {
    return Api.handleError(error)
  }
}
