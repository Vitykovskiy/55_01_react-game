import { useAuth } from '@entities/user'
import { Alert, Button, Icon, Loader, Text } from '@gravity-ui/uikit'
import { LogoYandex } from '@gravity-ui/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoutePath, usePage, REDIRECT_URI } from '@shared/config'
import { ResponseType } from '@shared/lib'
import Layout from '@shared/ui/Layout'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import { login, requestYandexServiceId } from '../lib/login'
import { DEFAULT_AUTH_ERROR, LOGIN_PAGE_TITLE } from '../model/consts'
import { schema } from '../model/schemas'
import { Schema } from '../model/types'
import s from './LoginPage.module.scss'
import { LoginPageInputs } from './LoginPageInputs'

export const LoginPage = () => {
  usePage({})

  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: 'all',
  })
  const { handleSubmit } = methods
  const [initiatedPage, setInitiatedPage] = useState(false)
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setInitiatedPage(true)
  }, [])

  const { isAuthenticated, isLoading } = useAuth()

  if (!initiatedPage) {
    return null
  }

  if (isLoading) {
    return (
      <Layout variant="center" title={LOGIN_PAGE_TITLE}>
        <Loader />
      </Layout>
    )
  }

  if (isAuthenticated) {
    return <Navigate to={RoutePath.Main} />
  }

  const onSubmit = async (data: Schema) => {
    setError(null)
    const response = await login(data)
    if (response.type === ResponseType.Success) {
      navigate(RoutePath.Main)
    } else {
      setError(response.message || DEFAULT_AUTH_ERROR)
    }
  }

  const handleButtonRegisterClick = () => {
    navigate(RoutePath.Register)
  }

  const handleYandexLogin = async () => {
    setError(null)
    const response = await requestYandexServiceId(REDIRECT_URI)
    if (response.type === ResponseType.Success && response.data) {
      const clientId = response.data.service_id
      const yandexOAuthUrl = `https://oauth.yandex.ru/authorize?response_type=code&client_id=${clientId}&redirect_uri=${encodeURIComponent(
        REDIRECT_URI
      )}`
      document.location.href = yandexOAuthUrl
    } else if (response.type === ResponseType.Error) {
      setError(response.message || DEFAULT_AUTH_ERROR)
    } else {
      setError(DEFAULT_AUTH_ERROR)
    }
  }

  return (
    <Layout variant="center" title={LOGIN_PAGE_TITLE}>
      <Text variant="header-1" as="h1">
        {LOGIN_PAGE_TITLE}
      </Text>
      <FormProvider {...methods}>
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
          <LoginPageInputs />
          <Button type={'submit'} view="action">
            Отправить
          </Button>
          <Button type={'button'} onClick={handleButtonRegisterClick}>
            Регистрация
          </Button>
        </form>
        {error && <Alert theme="danger" message={error} />}
      </FormProvider>

      <div className={s.oauth}>
        <Button type={'button'} view="action" onClick={handleYandexLogin}>
          <Icon data={LogoYandex} />
          Вход с помощью Яндекса
        </Button>
      </div>
    </Layout>
  )
}
