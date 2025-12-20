import { useDispatch, useSelectorStore } from '@entities/storeRedux'
import { useEffect, useState } from 'react'
import { getUserData } from '@entities/user/model/userStore'

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [isLoad, setIsLoad] = useState<boolean>(false)
  const user = useSelectorStore(state => state?.userSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      await dispatch(getUserData())
      setIsLoad(true)
    })()
  }, [])

  useEffect(() => {
    if (user.data) {
      setIsAuth(true)
      return
    }

    setIsAuth(false)
  }, [user, isLoad])

  return { isAuth, isLoad }
}
