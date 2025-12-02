import { Api } from '@shared/lib'
import { changePasswordApi } from '../api'
import { PasswordChangeData } from '../model/types'

export const changePassword = async (data: PasswordChangeData) => {
  try {
    await changePasswordApi(data)
    return Api.buildResponseSuccess(data)
  } catch (error) {
    return Api.handleError(error)
  }
}
