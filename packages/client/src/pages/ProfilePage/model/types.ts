import z from 'zod'
import { schema } from './schemas'

export type Schema = z.infer<typeof schema>

export type User = {
  avatar: string
  firstName: string
  secondName: string
  login: string
  password: string
  oldPassword: string
  email: string
  phone: string
}

export interface PasswordChangeData {
  oldPassword: string
  newPassword: string
}
