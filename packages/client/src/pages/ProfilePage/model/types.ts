import z from 'zod'
import { schema } from './schemas'

export type Schema = z.infer<typeof schema>

export interface PasswordChangeData {
  oldPassword: string
  newPassword: string
}
