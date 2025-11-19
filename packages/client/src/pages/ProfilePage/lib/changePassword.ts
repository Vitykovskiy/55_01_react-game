import { PasswordChangeData } from '../model/types'
import { changePasswordApi } from '../api'
import { useForm } from 'react-hook-form'

export const changePassword = async (
  data: PasswordChangeData
): Promise<void> => {
  const { setError } = useForm()
  try {
    await changePasswordApi(data)
  } catch (e) {
    setError('avatar', {
      type: 'manual',
      message: 'Не удалось изменить пароль',
    })
  }
}
