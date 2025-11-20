import { User } from '../model/types'
import { getUserApi } from '../api'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '@shared/config/routing'
export const getUser = async (): Promise<User | undefined> => {
  const navigate = useNavigate()
  try {
    return getUserApi()
  } catch {
    navigate(RoutePath.Error404)
  }
}
