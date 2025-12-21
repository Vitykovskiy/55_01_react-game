import { selectUser, setUser } from '@entities/user'
import { RoutePath } from '@shared/config'
import { ResponseType } from '@shared/lib'
import { useDispatch, useSelector } from '@shared/store'
import { useState } from 'react'
import { UseFormSetError } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { changeAvatar } from '../lib/changeAvatar'
import { changePassword } from '../lib/changePassword'
import { getUser } from '../lib/getUser'
import { Schema } from '../model/types'

export const useProfile = (setError: UseFormSetError<Schema>) => {
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
    } else {
      navigate(RoutePath.Error404)
    }
    setIsLoading(false)
  }

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
    user,
    isLoading,
    loadUser,
    updatePassword,
    updateAvatar,
  }
}
