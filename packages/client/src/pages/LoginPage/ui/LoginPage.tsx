import { Alert, Button, Icon, Text } from '@gravity-ui/uikit'
import { LogoYandex } from '@gravity-ui/icons'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@entities/user'
import { REDIRECT_URI, RoutePath } from '@shared/config'
import { ResponseType } from '@shared/lib'
import Layout from '@shared/ui/Layout'
import { login } from '../lib/login'
import { useYandexLogin } from '../model/useYandexLogin'
import { DEFAULT_AUTH_ERROR, LOGIN_PAGE_TITLE } from '../model/consts'
import { schema } from '../model/schemas'
import { Schema } from '../model/types'
import s from './LoginPage.module.scss'
import { LoginPageInputs } from './LoginPageInputs'
import { useEffect, useState } from 'react'
import { Loader } from '@shared/ui/Loader'

export const LoginPage = () => {
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: 'all',
  })
  const { handleSubmit } = methods
  const navigate = useNavigate()
  const [error, setError] = useState<string | null>(null)

  const { isAuthenticated, isLoading } = useAuth()

  useEffect(() => {
    if (isAuthenticated && !isLoading) {
      navigate(RoutePath.Main)
    }
  }, [isAuthenticated, isLoading, navigate])

  const handleYandexLogin = useYandexLogin({
    redirectUri: REDIRECT_URI,
    setError,
  })

  if (isAuthenticated || isLoading) {
    return (
      <Layout variant="center" title={LOGIN_PAGE_TITLE}>
        <Loader show={true} />
      </Layout>
    )
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
