import { Api } from '@shared/lib'
import { Schema } from '../model/types'

export const loginApi = (data: Schema): Promise<void> => {
  return Api.postRequest<void>('auth/signin', data)
}

export const getYandexServiceId = (redirectUri: string) =>
  Api.getRequest<{ service_id: string }>('oauth/yandex/service-id', {
    redirect_uri: redirectUri,
  })
