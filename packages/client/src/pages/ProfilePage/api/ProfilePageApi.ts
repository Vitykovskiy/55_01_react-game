import { Api } from '@shared/lib'
import { PasswordChangeData, User } from '../model/types'
import { dto } from './dto'

export const ProfilePageApi = {
  getUser: (): Promise<User | undefined> => {
    return dto.getUser()
  },

  changePassword: (data: PasswordChangeData): Promise<void> => {
    return Api.putRequest<void>('user/password', {
      oldPassword: data.oldPassword,
      newPassword: data.newPassword,
    })
  },

  updateAvatar: (file: File): Promise<User | undefined> => {
    const formData = new FormData()
    formData.append('avatar', file)

    return Api.putRequest<User | undefined>('user/profile/avatar', formData, {
      'Content-Type': 'multipart/form-data',
    })
  },
}
