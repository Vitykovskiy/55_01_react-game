import { Api } from '@shared/lib'
import { PasswordChangeData, User } from '../model/types'
import { mapUserDtoToUser, UserDto } from './dto'

export const getUserApi = async (): Promise<User | undefined> => {
  const response = await Api.getRequest<UserDto>('auth/user')
  if (response) {
    return mapUserDtoToUser(response)
  }
  return response
}

export const changePasswordApi = (data: PasswordChangeData): Promise<void> => {
  return Api.putRequest<undefined>('user/password', {
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
  })
}

export const changeAvatarApi = (file: File): Promise<User | undefined> => {
  const formData = new FormData()
  formData.append('avatar', file)

  return Api.putRequest<User | undefined>('user/profile/avathgar', formData, {
    'Content-Type': 'multipart/form-data',
  })
}
