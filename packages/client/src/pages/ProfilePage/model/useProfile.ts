import { useState } from 'react'
import { User } from './types'
import { useCases } from './useCases'

export const useProfile = () => {
  const [user, setUser] = useState<User | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(true)

  const loadUser = async () => {
    const userData = await useCases.loadUser()
    setUser(userData)
    setIsLoading(false)
  }

  const updatePassword = async (oldPassword: string, newPassword: string) => {
    await useCases.updatePassword({ oldPassword, newPassword })
  }

  const updateAvatar = async (file: File) => {
    const updatedUser = await useCases.updateAvatar(file)
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
