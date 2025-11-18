import { ProfilePageApi } from '../api/ProfilePageApi'
import { PasswordChangeData, User } from './types'

export const useCases = {
  loadUser: async (): Promise<User | undefined> => {
    const user = await ProfilePageApi.getUser()
    if (!user) {
      throw new Error('Не удалось загрузить данные пользователя')
    }
    return user
  },

  updatePassword: async (data: PasswordChangeData): Promise<void> => {
    await ProfilePageApi.changePassword(data)
  },

  updateAvatar: async (file: File): Promise<User | undefined> => {
    const user = await ProfilePageApi.updateAvatar(file)
    if (!user) {
      throw new Error('Не удалось обновить аватар')
    }
    return user
  },
}
