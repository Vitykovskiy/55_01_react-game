import { User } from '../model/types'
import { changeAvatarApi } from '../api'
import { useForm } from 'react-hook-form'

export const changeAvatar = async (file: File): Promise<User | undefined> => {
  const { setError } = useForm()
  try {
    return changeAvatarApi(file)
  } catch (e) {
    setError('avatar', {
      type: 'manual',
      message: 'Ошибка при смене аватара',
    })
  }
}
