import { useDispatch, useSelector } from '@shared/store'
import { useEffect } from 'react'
import { getUserData } from './userStore'

export const useAuth = () => {
  const { data, isAuthenticated, isLoadingUser } = useSelector(
    state => state?.user
  )
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      if (isAuthenticated) {
        return
      }

      await dispatch(getUserData())
    })()
  }, [])

  return { isAuthenticated, isLoading: isLoadingUser, user: data }
}
