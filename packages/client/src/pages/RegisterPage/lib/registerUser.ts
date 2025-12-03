import { Api, CommonErrorType } from '@shared/lib'
import { registerRequest, RegisterUserDto } from '../api'
import { RegisterUser } from '../model/types'

const mapUserToDto = (user: RegisterUser): RegisterUserDto => ({
  first_name: user.firstName,
  second_name: user.lastName,
  login: user.login,
  email: user.email,
  phone: user.phone,
  password: user.password || '',
})

export const registerUser = async (user: RegisterUser) => {
  try {
    const response = await registerRequest(mapUserToDto(user))

    if (response && response.id) {
      return Api.buildResponseSuccess(undefined)
    }

    return Api.buildResponseError(CommonErrorType.UnknownError)
  } catch (error) {
    return Api.handleError(error)
  }
}
