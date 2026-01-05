import { UserDto } from '@entities/user'
import { Api } from '@shared/lib'

export type RegisterUserDto = Omit<UserDto, 'avatar' | 'id'> & {
  password: string
}

export type RegisterResponse = {
  id: string
}

export const registerRequest = (dto: RegisterUserDto) => {
  return Api.postRequest<RegisterResponse>('auth/signup', dto)
}
