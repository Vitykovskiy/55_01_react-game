import { setUser } from '@entities/user'
import { ResponseType } from '@shared/lib'
import { useDispatch } from '@shared/store'
import { UseFormSetError } from 'react-hook-form'
import { changeAvatar } from '../lib/changeAvatar'
import { changePassword } from '../lib/changePassword'
import { Schema } from '../model/types'

export const useProfile = (setError: UseFormSetError<Schema>) => {
  const dispatch = useDispatch()

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    const response = await changePassword({ oldPassword, newPassword })
    if (response.type !== ResponseType.Success) {
      setError('password', {
        type: 'manual',
        message: 'Не удалось изменить пароль',
      })
    }
  }

  const updateAvatar = async (file: File) => {
    const response = await changeAvatar(file)
    if (response.type === ResponseType.Success) {
      dispatch(setUser(response.data))
    }
  }

  return {
    updatePassword,
    updateAvatar,
  }
}
