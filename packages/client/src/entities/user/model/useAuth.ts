import { useDispatch, useSelectorStore } from '@entities/storeRedux'
import { useEffect, useState } from 'react'
import { getUserData } from '@entities/user/model/userStore'

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false)
  const [isUpload, setIsUpload] = useState<boolean>(false)
  const user = useSelectorStore(state => state?.userSlice)
  const dispatch = useDispatch()

  useEffect(() => {
    ;(async () => {
      await dispatch(getUserData())
      setIsUpload(true)
    })()
  }, [])

  useEffect(() => {
    if (user.data) {
      setIsAuth(true)
      return
    }

    setIsAuth(false)
  }, [user, isUpload])

  return { isAuth, isUpload }
}
