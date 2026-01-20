import { useAuth } from '@entities/user'
import { RoutePath } from '@shared/config'
import { Loader } from '@shared/ui/Loader'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const [shouldRedirect, setShouldRedirect] = useState(false)
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && !isAuthenticated) {
      setShouldRedirect(true)
    }
  }, [isClient, isAuthenticated])

  if (!isClient) {
    return <Loader show={isLoading} />
  }

  if (shouldRedirect) {
    return <Navigate to={RoutePath.Login} replace />
  }

  return <Loader show={isLoading}>{children}</Loader>
}
