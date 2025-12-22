import { Loader } from '@gravity-ui/uikit'
import { RoutePath, useAuth } from '@shared/config'
import { Navigate } from 'react-router-dom'
import s from './style.module.scss'

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const isAuth = useAuth()

  if (isAuth === null)
    return (
      <div className={s.loaderContainer}>
        <Loader />
      </div>
    )

  if (!isAuth) {
    return <Navigate to={RoutePath.Login} replace />
  }

  return children
}
