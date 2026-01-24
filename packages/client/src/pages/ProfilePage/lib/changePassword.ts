import { yandexApi } from '@shared/lib'
import { changePasswordApi } from '../api'
import { PasswordChangeData } from '../model/types'

export const changePassword = async (data: PasswordChangeData) => {
  try {
    await changePasswordApi(data)
    return yandexApi.buildResponseSuccess(data)
  } catch (error) {
    return yandexApi.handleError(error)
  }
}
