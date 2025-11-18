import { User } from '../model/types'

export type UserDto = {
  first_name: string
  second_name: string
  avatar: string
  login: string
  email: string
  phone: string
}

const mapUserDtoToUser = (user: UserDto): User => {
  return {
    firstName: user.first_name,
    secondName: user.second_name,
    avatar: user.avatar,
    login: user.login,
    email: user.email,
    phone: user.phone,
    password: '',
    oldPassword: '',
  }
}
