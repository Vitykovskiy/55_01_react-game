import { Api } from '../../lib'
import { useEffect, useState } from 'react'

export const useAuth = () => {
  const [isAuth, setIsAuth] = useState<boolean | null>(null)

  useEffect(() => {
    let cancelled = false

    ;(async () => {
      try {
        await Api.getRequest('auth/user')
        if (!cancelled) setIsAuth(true)
      } catch {
        if (!cancelled) setIsAuth(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [])

  return isAuth
}
