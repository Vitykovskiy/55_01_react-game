import { User } from '../model/types'
import { changeAvatarApi } from '../api'

export const changeAvatar = async (file: File): Promise<User | undefined> => {
  return changeAvatarApi(file)
}
