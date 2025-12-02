import { useEffect, useState } from 'react'
import { BASE_URL } from './consts'

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  useEffect(() => {
    fetch(`${BASE_URL}/auth/user`, {
      credentials: 'include',
    })
      .then(response => setIsAuth(response.ok))
      .catch(() => setIsAuth(false))
  }, [])

  return isAuth
}
