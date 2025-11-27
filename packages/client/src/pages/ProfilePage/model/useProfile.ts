import { useState } from 'react'
import { getUser } from '../lib/getUser'
import { changePassword } from '../lib/changePassword'
import { changeAvatar } from '../lib/changeAvatar'
import { UseFormSetError } from 'react-hook-form'
import { RoutePath } from '@shared/config/routing'
import { useNavigate } from 'react-router-dom'
import { Schema } from '../model/types'
import { ResponseType } from '@shared/lib'
import { selectUser, setUser } from '../../../store/userSlice'
import { useDispatch, useSelector } from '@app/store'

export const useProfile = (setError: UseFormSetError<Schema>) => {
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const reduxUser = useSelector(selectUser)
  const dispatch = useDispatch()

  const loadUser = async () => {
    if (reduxUser) {
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
    user: reduxUser,
    isLoading,
    loadUser,
    updatePassword,
    updateAvatar,
  }
}
