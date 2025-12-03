import { RoutePath } from '@shared/config/routing'
import { ResponseType } from '@shared/lib'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../lib/registerUser'
import { Schema } from '../model/types'

const ERROR_TEXT = 'Произошла ошибка регистрации'

export const useRegister = () => {
  const navigate = useNavigate()
  const [error, setError] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(false)
  const onSubmit = async (data: Schema) => {
    setLoading(true)

    const result = await registerUser(data)

    setLoading(false)

    if (result.type === ResponseType.Success) {
      navigate(RoutePath.Main)
      return
    }

    setError(ERROR_TEXT)
  }

  return { loading, onSubmit, error }
}
