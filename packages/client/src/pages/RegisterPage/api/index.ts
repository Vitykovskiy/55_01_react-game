import { UserDto } from '@entities/user'
import { yandexApi } from '@shared/lib'

export type RegisterUserDto = Omit<UserDto, 'avatar' | 'id'> & {
  password: string
}

export type RegisterResponse = {
  id: string
}

export const registerRequest = (dto: RegisterUserDto) => {
  return yandexApi.postRequest<RegisterResponse>('auth/signup', dto)
}
