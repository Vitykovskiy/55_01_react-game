import { Navigate } from 'react-router-dom'
import { useAuth } from '@shared/config/routing/useAuth'
import { RoutePath } from '@shared/config/routing'
import { Loader } from '@gravity-ui/uikit'
import s from './style.module.scss'

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = useAuth()

  if (isAuth === null)
    return (
      <div className={s.centerLoader}>
        <Loader />
      </div>
    )

  if (!isAuth) return <Navigate to={RoutePath.Login} replace />

  return children
}
