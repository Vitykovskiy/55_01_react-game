import { yandexApi } from '@shared/lib'
import { UserDto } from '../model/types'

export const getUserRequest = (): Promise<UserDto | undefined> => {
  return yandexApi.getRequest<UserDto | undefined>('auth/user')
}

export const getUserByLogin = async (
  login: string
): Promise<UserDto | undefined> => {
  // Т.к. нет поиска по id пользователя
  const result = await yandexApi.postRequest<UserDto[]>('/user/search', {
    login,
  })

  return result?.[0]
}
