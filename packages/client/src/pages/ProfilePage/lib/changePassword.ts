import { PasswordChangeData } from '../model/types'
import { changePasswordApi } from '../api'

export const changePassword = async (
  data: PasswordChangeData
): Promise<void> => {
  try {
    await changePasswordApi(data)
  } catch (e) {
    throw new Error('Не удалось изменить пароль', { cause: e })
  }
}
