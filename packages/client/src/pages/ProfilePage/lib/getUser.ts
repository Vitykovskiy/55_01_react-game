import { User } from '../model/types'
import { getUserApi } from '../api'
import { useForm } from 'react-hook-form'

export const getUser = async (): Promise<User | undefined> => {
  const { setError } = useForm()
  try {
    return getUserApi()
  } catch (e) {
    setError('avatar', {
      type: 'manual',
      message: 'Не удалось загрузить данные пользователя',
    })
  }
}
