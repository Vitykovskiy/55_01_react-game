import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from '@shared/store'
import { getUserData } from '@entities/user'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const user = useSelector(state => state?.user)
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      await dispatch(getUserData())
      setIsLoading(false)
    })()
  }, [])

  useEffect(() => {
    if (user.data) {
      setIsAuthenticated(true)
      return
    }

    setIsAuthenticated(false)
  }, [user, isLoading])

  return { isAuthenticated, isLoading }
}
