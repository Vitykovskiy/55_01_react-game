import { User } from '@entities/user'
import { Api } from '@shared/lib'
import { PasswordChangeData } from '../model/types'

export const changePasswordApi = (data: PasswordChangeData): Promise<void> => {
  return Api.putRequest<void>('user/password', {
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
  })
}

export const changeAvatarApi = (file: File): Promise<User | undefined> => {
  const formData = new FormData()
  formData.append('avatar', file)

  return Api.putRequest<User | undefined>('user/profile/avatar', formData, {
    'Content-Type': 'multipart/form-data',
  })
}
