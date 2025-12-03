import {
  errorMessages,
  LOGIN_MAX,
  LOGIN_MIN,
  LOGIN_REGEX,
  NAME_MAX,
  NAME_REGEX,
  PASSWORD_MAX,
  PASSWORD_MIN,
  PASSWORD_REGEX,
  PHONE_REGEX,
} from '@shared/lib/validation'
import * as z from 'zod'

export const schema = z.object({
  firstName: z
    .string(errorMessages.firstName.required)
    .max(NAME_MAX, errorMessages.firstName.max)
    .regex(NAME_REGEX, errorMessages.firstName.invalid),
  lastName: z
    .string(errorMessages.lastName.required)
    .max(NAME_MAX, errorMessages.lastName.max)
    .regex(NAME_REGEX, errorMessages.lastName.invalid),
  email: z.email(errorMessages.email.invalid),
  login: z
    .string(errorMessages.login.required)
    .min(LOGIN_MIN, errorMessages.login.min)
    .max(LOGIN_MAX, errorMessages.login.max)
    .regex(LOGIN_REGEX, errorMessages.login.invalid),
  password: z
    .string(errorMessages.password.required)
    .min(PASSWORD_MIN, errorMessages.password.min)
    .max(PASSWORD_MAX, errorMessages.password.max)
    .regex(PASSWORD_REGEX, errorMessages.password.invalid),
  phone: z
    .string(errorMessages.phone.invalid)
    .regex(PHONE_REGEX, errorMessages.phone.invalid),
})
