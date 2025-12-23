import { useEffect, useState } from 'react'
import { getUserData } from '@entities/user/model/userStore'
import { useDispatch, useSelector } from '@shared/store'

export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const user = useSelector(state => state?.user)
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      await dispatch(getUserData())
      setIsLoading(true)
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
