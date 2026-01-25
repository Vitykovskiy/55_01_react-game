import { useCallback } from 'react'
import { ResponseType } from '@shared/lib'
import { DEFAULT_AUTH_ERROR } from './consts'
import { requestYandexServiceId } from '../lib/login'

type UseYandexLoginOptions = {
  redirectUri: string
  setError: (message: string | null) => void
}

const buildYandexOAuthUrl = (clientId: string, redirectUri: string) =>
  `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
    redirectUri
  )}`

export const useYandexLogin = ({
  redirectUri,
  setError,
}: UseYandexLoginOptions) => {
  return useCallback(async () => {
    try {
      const response = await requestYandexServiceId(redirectUri)
      if (response.type === ResponseType.Success) {
        setError(null)
        const clientId = response.data.service_id
        const yandexOAuthUrl = buildYandexOAuthUrl(clientId, redirectUri)
        document.location.href = yandexOAuthUrl
        return
      }

      if (response.type === ResponseType.Error) {
        setError(response.message || DEFAULT_AUTH_ERROR)
        return
      }

      setError(DEFAULT_AUTH_ERROR)
    } catch {
      setError(DEFAULT_AUTH_ERROR)
    }
  }, [redirectUri, setError])
}
