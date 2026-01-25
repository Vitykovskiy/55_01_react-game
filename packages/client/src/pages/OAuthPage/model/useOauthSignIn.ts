import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { ResponseType } from '@shared/lib'
import { REDIRECT_URI, RoutePath } from '@shared/config'

import { yandexOauthSignIn } from '../lib/oauth'
import { CODE_MISSING, DEFAULT_YANDEX_OAUTH_ERROR } from './consts'

type UseOauthSignInOptions = {
  setError: (message: string | null) => void
}

const resolveOauthError = (message?: string | null) =>
  message || DEFAULT_YANDEX_OAUTH_ERROR

export const useOauthSignIn = ({ setError }: UseOauthSignInOptions) => {
  const navigate = useNavigate()

  return useCallback(
    async (oauthCode: string | null) => {
      if (!oauthCode) {
        setError(CODE_MISSING)
        return
      }

      try {
        const response = await yandexOauthSignIn(oauthCode, REDIRECT_URI)

        if (response.type === ResponseType.Success) {
          navigate(RoutePath.Main, { replace: true })
          return
        }

        setError(resolveOauthError(response.message))
      } catch {
        setError(DEFAULT_YANDEX_OAUTH_ERROR)
      }
    },
    [navigate, setError]
  )
}
