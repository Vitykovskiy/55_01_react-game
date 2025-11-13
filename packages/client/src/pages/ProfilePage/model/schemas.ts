import * as z from 'zod'
import { PASSWORD_MAX, PASSWORD_MIN, PASSWORD_REGEX } from './consts'
import { errorMessages } from './errors'

export const schema = z.object({
  password: z
    .string(errorMessages.password.min)
    .min(PASSWORD_MIN, errorMessages.password.min)
    .max(PASSWORD_MAX, errorMessages.password.max)
    .regex(PASSWORD_REGEX, { message: errorMessages.password.invalid }),
})
