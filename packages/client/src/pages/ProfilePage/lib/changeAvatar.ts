import { User } from '../model/types'
import { changeAvatarApi } from '../api'

export const changeAvatar = async (file: File): Promise<User | undefined> => {
  try {
    return changeAvatarApi(file)
  } catch (e) {
    new Error('Не удалось изменить аватар пользователя', { cause: e })
  }
}
