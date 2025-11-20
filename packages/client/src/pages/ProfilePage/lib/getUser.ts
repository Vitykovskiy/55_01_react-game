import { User } from '../model/types'
import { getUserApi } from '../api'

export const getUser = async (): Promise<User | undefined> => {
  try {
    return getUserApi()
  } catch {
    console.log(11)
  }
}
