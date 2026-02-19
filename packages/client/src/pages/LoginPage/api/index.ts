import { serverApi, yandexApi } from '@shared/lib'
import { Schema } from '../model/types'

export const loginApi = (data: Schema): Promise<void> => {
  return yandexApi.postRequest<void>('auth/signin', data)
}

export const forumLoginApi = (data: Schema): Promise<void> => {
  return serverApi.postRequest<void>('api/auth/signin', data)
}

export const getYandexServiceId = (redirectUri: string) =>
  yandexApi.getRequest<{ service_id: string }>('oauth/yandex/service-id', {
    redirect_uri: redirectUri,
  })
