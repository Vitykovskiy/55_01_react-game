import { useState } from 'react'
import { User } from './types'
import { getUser } from '../lib/getUser'
import { changePassword } from '../lib/changePassword'
import { changeAvatar } from '../lib/changeAvatar'
import { RoutePath } from '@shared/config/routing'
import { useNavigate } from 'react-router-dom'

export const useProfile = () => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()
  const loadUser = async () => {
    try {
      const userData = await getUser()
      setUser(userData)
      setIsLoading(false)
    } catch (e) {
      navigate(RoutePath.error)
      return new Error('Не удалось загрузить данные пользователя', { cause: e })
    }
  }

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    await changePassword({ oldPassword, newPassword })
  }

  const updateAvatar = async (file: File) => {
    const updatedUser = await changeAvatar(file)
    setUser(updatedUser)
  }

  return {
    user,
    isLoading,
    loadUser,
    updatePassword,
    updateAvatar,
  }
}
