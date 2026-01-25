import { Api } from '@shared/lib'

export const yandexOauthSignInApi = (code: string, redirect_uri: string) =>
  Api.postRequest<void>('oauth/yandex', { code, redirect_uri })
