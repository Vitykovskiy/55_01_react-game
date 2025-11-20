import { PasswordChangeData } from '../model/types'
import { changePasswordApi } from '../api'
import { Api } from '@shared/lib'

export const changePassword = async (data: PasswordChangeData) => {
  try {
    const password = await changePasswordApi(data)
    return Api.buildResponseSuccess(password)
  } catch (error) {
    return Api.handleError(error)
  }
}
