import { User, UserDto } from '@entities/user'

export const mapUserDtoToUser = (dto: UserDto): User => ({
  id: dto.id,
  email: dto.email,
  firstName: dto.first_name,
  lastName: dto.second_name,
  avatar: dto.avatar,
  login: dto.login,
  phone: dto.phone,
  password: '',
  oldPassword: '',
})
