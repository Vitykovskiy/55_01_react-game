import { PasswordChangeData } from '../model/types'
import { changePasswordApi } from '../api'

export const changePassword = (data: PasswordChangeData) => {
  return changePasswordApi(data)
}
