import { Navigate } from 'react-router-dom'
import { useAuth } from '@entities/user/model/useAuth'
import { RoutePath } from '../../shared/config/routing'
import { Loader } from '@gravity-ui/uikit'
import s from './style.module.scss'

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { isAuth, isLoad } = useAuth()

  if (!isLoad) {
    return (
      <div className={s.loaderContainer}>
        <Loader />
      </div>
    )
  }

  if (!isAuth && isLoad) {
    return <Navigate to={RoutePath.Login} replace />
  }

  return children
}
