import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import { useAuth } from '@entities/user'
import Layout from '@shared/ui/Layout'
import { Alert, Loader } from '@gravity-ui/uikit'

import { RoutePath } from '@shared/config'
import { useOauthSignIn } from '../model/useOauthSignIn'

const getOAuthCode = (search: string) => {
  const params = new URLSearchParams(search)
  return params.get('code')
}

export const OAuthPage = () => {
  const location = useLocation()
  const [error, setError] = useState<string | null>(null)
  const { isAuthenticated, isLoading } = useAuth()
  const oauthSignIn = useOauthSignIn({ setError })

  useEffect(() => {
    if (isAuthenticated || isLoading) {
      return
    }

    const code = getOAuthCode(location.search)
    void oauthSignIn(code)
  }, [isAuthenticated, isLoading, location, oauthSignIn])

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
