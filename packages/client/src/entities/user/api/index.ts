import { yandexApi } from '@shared/lib'
import { UserDto } from '../model/types'

export const getUserRequest = (): Promise<UserDto | undefined> => {
  return yandexApi.getRequest<UserDto | undefined>('auth/user')
}
