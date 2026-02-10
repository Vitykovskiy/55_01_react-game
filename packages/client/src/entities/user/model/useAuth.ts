import { useDispatch, useSelector } from '@shared/store'
import { useEffect } from 'react'
import { getUserData } from './userStore'

export const useAuth = () => {
  const { data, isAuthenticated, isLoadingUser } = useSelector(
    state => state?.user
  )
  const dispatch = useDispatch()

  useEffect(() => {
    if (isAuthenticated) {
      return
    }

    dispatch(getUserData())
  }, [dispatch, isAuthenticated])

  return { isAuthenticated, isLoading: isLoadingUser, user: data }
}
