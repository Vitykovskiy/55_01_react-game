import * as z from 'zod'
import {
  LOGIN_MAX,
  LOGIN_MIN,
  LOGIN_REGEX,
  PASSWORD_MAX,
  PASSWORD_MIN,
  PASSWORD_REGEX,
  errorMessages,
} from '@shared/lib/validation'

export const schema = z.object({
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
})
