import { useState } from 'react'
import { User } from './types'
import { getUser } from '../lib/getUser'
import { changePassword } from '../lib/changePassword'
import { changeAvatar } from '../lib/changeAvatar'
import { RoutePath } from '@shared/config/routing'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
export const useProfile = () => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const { setError } = useForm()

  const loadUser = async () => {
    try {
      const userData = await getUser()
      setUser(userData)
      setIsLoading(false)
    } catch (e) {
      navigate(RoutePath.Error404)
    }
  }

  const updatePassword = (oldPassword: string, newPassword: string) => {
    try {
      changePassword({ oldPassword, newPassword })
    } catch {
      setError('password', {
        type: 'manual',
        message: 'Не удалось изменить пароль',
      })
    }
  }

  const updateAvatar = async (file: File) => {
    try {
      const updatedUser = await changeAvatar(file)
      setUser(updatedUser)
    } catch {
      setError('avatar', {
        type: 'manual',
        message: 'Не удалось изменить аватар',
      })
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
