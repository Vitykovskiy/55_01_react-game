import { yandexApi, serverApi } from '@shared/lib'
import { UserDto } from '../model/types'

export const getUserRequest = (): Promise<UserDto> => {
  return yandexApi.getRequest<UserDto>('auth/user')
}

export const logoutRequest = async (): Promise<{ ok: boolean }> => {
  return serverApi.postRequest<{ ok: boolean }>('api/auth/logout', {})
}
