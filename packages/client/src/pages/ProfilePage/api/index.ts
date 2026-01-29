import { User } from '@entities/user'
import { yandexApi } from '@shared/lib'
import { PasswordChangeData } from '../model/types'

export const changePasswordApi = (data: PasswordChangeData): Promise<void> => {
  return yandexApi.putRequest<void>('user/password', {
    oldPassword: data.oldPassword,
    newPassword: data.newPassword,
  })
}

export const changeAvatarApi = (file: File): Promise<User> => {
  const formData = new FormData()
  formData.append('avatar', file)

  return yandexApi.putRequest<User>('user/profile/avatar', formData, {
    'Content-Type': 'multipart/form-data',
  })
}
