import { useState } from 'react'
import { getUser } from '../lib/getUser'
import { changePassword } from '../lib/changePassword'
import { changeAvatar } from '../lib/changeAvatar'
import { UseFormSetError } from 'react-hook-form'
import { RoutePath } from '@shared/config/routing'
import { useNavigate } from 'react-router-dom'
import { Schema } from '../model/types'
import { ResponseType } from '@shared/lib'
import {
  selectUser,
  setUser,
  setError,
  clearError,
  useDispatch,
  useSelector,
} from '@entities/user'

export const useProfile = (setFormError: UseFormSetError<Schema>) => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const loadUser = async () => {
    if (user) {
      setIsLoading(false)
      return
    }

    const response = await getUser()
    if (response.type === ResponseType.Success) {
      dispatch(setUser(response.data))
      dispatch(clearError())
    } else {
      dispatch(setError('Произошла ошибка при загрузке пользователя'))
      navigate(RoutePath.Error404)
    }
    setIsLoading(false)
  }

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    const response = await changePassword({ oldPassword, newPassword })
    if (response.type !== ResponseType.Success) {
      setFormError('password', {
        type: 'manual',
        message: 'Не удалось изменить пароль',
      })
    }
  }

  const updateAvatar = async (file: File) => {
    const response = await changeAvatar(file)
    if (response.type === ResponseType.Success) {
      dispatch(setUser(response.data))
      dispatch(clearError())
    } else {
      dispatch(setError('Произошла ошибка при смене аватара'))
    }
  }

  return {
    user,
    isLoading,
    loadUser,
    updatePassword,
    updateAvatar,
  }
}
