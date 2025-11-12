import { Button, Text } from '@gravity-ui/uikit'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoutePath, usePage } from '@shared/config/routing'
import Layout from '@shared/ui/Layout'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { LOGIN_PAGE_TITLE } from '../model/consts'
import { schema } from '../model/schemas'
import { Schema } from '../model/types'
import s from './LoginPage.module.scss'
import { LoginPageInputs } from './LoginPageInputs'

export const LoginPage = () => {
  usePage({})
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
  })
  const { handleSubmit } = methods
  const [initiatedPage, setInitiatedPage] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setInitiatedPage(true)
  }, [])

  if (!initiatedPage) {
    return null
  }

  const onSubmit = (data: Schema) => {
    console.log(data)
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
      </FormProvider>
    </Layout>
  )
}
