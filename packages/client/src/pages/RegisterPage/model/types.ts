import { User } from '@entities/user'
import z from 'zod'
import { schema } from './schemas'

export type Schema = z.infer<typeof schema>

export type RegisterUser = Omit<
  User,
  'avatar' | 'oldPassword' | 'lastName' | 'phone'
> & {
  lastName?: string
  phone?: string
}
