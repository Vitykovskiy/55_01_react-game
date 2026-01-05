import { useAuth } from '@entities/user'

import { RoutePath } from '@shared/config'
import { Loader } from '@shared/ui/Loader'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (!isAuthenticated) {
    return <Navigate to={RoutePath.Login} replace />
  }

  return <Loader show={isLoading}>{children}</Loader>
}
