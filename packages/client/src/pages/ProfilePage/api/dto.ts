import { User } from '../model/types'

export type UserDto = {
  first_name: string
  second_name: string
  avatar: string
  login: string
  email: string
  phone: string
}

export const mapUserDtoToUser = (dto: UserDto): User => ({
  email: dto.email,
  firstName: dto.first_name,
  secondName: dto.second_name,
  avatar: dto.avatar,
  login: dto.login,
  phone: dto.phone,
  password: '',
  oldPassword: '',
})
