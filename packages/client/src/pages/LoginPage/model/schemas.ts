import * as z from 'zod'
import { errorMessages } from './errors'

//TODO Поменять валидацию с учётом требований задачи https://github.com/Vitykovskiy/55_01_react-game/issues/18
//Пример прикручивания валидации. В текущей реализации работает только если в полях undefined.
// На пустые строки не работает.
export const schema = z.object({
  login: z.string(errorMessages.login.required),
  password: z.string(errorMessages.password.required),
})
