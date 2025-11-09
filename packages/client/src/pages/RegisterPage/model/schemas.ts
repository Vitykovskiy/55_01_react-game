import * as z from 'zod'
import {
  LOGIN_MAX,
  LOGIN_MIN,
  NAME_MAX,
  NAME_MIN,
  PASSWORD_MAX,
  PASSWORD_MIN,
  PHONE_REGEX,
} from './consts'
import { errorMessages } from './errors'

//TODO Поменять валидацию с учётом требований задачи https://github.com/Vitykovskiy/55_01_react-game/issues/18
//Пример прикручивания валидации
export const schema = z.object({
  firstName: z
    .string(errorMessages.firstName.min)
    .min(NAME_MIN, errorMessages.firstName.min)
    .max(NAME_MAX, errorMessages.firstName.max),
  lastName: z
    .string(errorMessages.lastName.min)
    .min(NAME_MIN, errorMessages.lastName.min)
    .max(NAME_MAX, errorMessages.lastName.max),
  email: z.email(errorMessages.email.invalid),
  login: z
    .string(errorMessages.login.min)
    .min(LOGIN_MIN, errorMessages.login.min)
    .max(LOGIN_MAX, errorMessages.login.max),
  password: z
    .string(errorMessages.password.min)
    .min(PASSWORD_MIN, errorMessages.password.min)
    .max(PASSWORD_MAX, errorMessages.password.max),
  phone: z
    .string(errorMessages.phone.invalid)
    .regex(PHONE_REGEX, { message: errorMessages.phone.invalid }),
})
