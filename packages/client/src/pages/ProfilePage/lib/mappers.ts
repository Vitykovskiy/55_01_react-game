import { User } from '../model/types'
import { UserDto } from '../api/dto'

export const mapUserDtoToUser = (dto: UserDto): User => ({
  email: dto.email,
  firstName: dto.first_name,
  lastName: dto.second_name,
  avatar: dto.avatar,
  login: dto.login,
  phone: dto.phone,
  password: '',
  oldPassword: '',
})
