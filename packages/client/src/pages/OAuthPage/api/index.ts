import { yandexApi } from '@shared/lib'

export const yandexOauthSignInApi = (code: string, redirect_uri: string) =>
  yandexApi.postRequest<void>('oauth/yandex', { code, redirect_uri })
