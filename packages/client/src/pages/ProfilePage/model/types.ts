import z from 'zod'
import { schema } from './schemas'

export type Schema = z.infer<typeof schema>

export type User = {
  avatar: string
  first_name: string
  second_name: string
  login: string
  password: string
  email: string
  phone: string
}

export interface PasswordChangeData {
  oldPassword: string
  newPassword: string
}
