import { useEffect, useState } from 'react'
import { Navigate, useLocation, useNavigate } from 'react-router-dom'

import { useAuth } from '@entities/user'
import { ResponseType } from '@shared/lib'
import Layout from '@shared/ui/Layout'
import { Alert, Loader } from '@gravity-ui/uikit'

import { REDIRECT_URI, RoutePath } from '@shared/config'
import { yandexOauthSignIn } from '../lib/oauth'
import { CODE_MISSING, DEFAULT_YANDEX_OAUTH_ERROR } from '../model/consts'

export const OAuthPage = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (isAuthenticated || isLoading) {
      return
    }

    const params = new URLSearchParams(location.search)
    const code = params.get('code')

    if (code) {
      yandexOauthSignIn(code, REDIRECT_URI).then(response => {
        if (response.type === ResponseType.Success) {
          navigate(RoutePath.Main)
        } else {
          setError(response.message || DEFAULT_YANDEX_OAUTH_ERROR)
        }
      })
    } else {
      setError(CODE_MISSING)
    }
  }, [isAuthenticated, isLoading, location, navigate])

  if (isLoading) {
    return (
      <Layout variant="center" title="OAuth">
        <Loader />
      </Layout>
    )
  }

  if (isAuthenticated) {
    return <Navigate to={RoutePath.Main} />
  }

  return (
    <Layout variant="center" title="OAuth">
      {error ? <Alert theme="danger" message={error} /> : <Loader />}
    </Layout>
  )
}
