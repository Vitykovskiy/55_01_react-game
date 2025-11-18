import { User } from '../model/types'
import { Api } from '@shared/lib'

export const dto = {
  getUser: async (): Promise<User | undefined> => {
    try {
      const response = await Api.getRequest<BackendUser>('auth/user')
      if (response) {
        return mapBackendUserToUser(response)
      }
      return undefined
    } catch (error) {
      console.error('Error fetching user:', error)
      return undefined
    }
  },
}

type BackendUser = {
  first_name: string
  second_name: string
  avatar: string
  login: string
  email: string
  phone: string
}

const mapBackendUserToUser = (backendUser: BackendUser): User => {
  return {
    firstName: backendUser.first_name,
    secondName: backendUser.second_name,
    avatar: backendUser.avatar,
    login: backendUser.login,
    email: backendUser.email,
    phone: backendUser.phone,
    password: '',
    oldPassword: '',
  }
}
