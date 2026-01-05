import { Api } from '@shared/lib'
import { UserDto } from '../model/types'

export const getUserRequest = (): Promise<UserDto | undefined> => {
  return Api.getRequest<UserDto | undefined>('auth/user')
}
