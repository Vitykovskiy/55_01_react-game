import { useAuth } from '@entities/user'
import { Loader } from '@gravity-ui/uikit'
import { RoutePath } from '@shared/config'
import { Navigate } from 'react-router-dom'
import s from './style.module.scss'

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className={s.loaderContainer}>
        <Loader />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to={RoutePath.Login} replace />
  }

  return children
}
