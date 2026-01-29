import { yandexApi } from '@shared/lib'
import { UserDto } from '../model/types'

export const getUserRequest = (): Promise<UserDto> => {
  return yandexApi.getRequest<UserDto>('auth/user')
}
