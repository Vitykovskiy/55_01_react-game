import { useAuth } from '@entities/user'
import { RoutePath } from '@shared/config'
import { Loader } from '@shared/ui/Loader'
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return <Loader show={true} />
  }

  if (!isAuthenticated) {
    return <Navigate to={RoutePath.Login} replace />
  }

  return <Loader show={isLoading}>{children}</Loader>
}
