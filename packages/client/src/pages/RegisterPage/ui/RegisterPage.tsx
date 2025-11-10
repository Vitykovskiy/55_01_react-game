import { Button, Text } from '@gravity-ui/uikit'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoutePath, usePage } from '@shared/config/routing'
import Layout from '@shared/ui/Layout'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { schema } from '../model/schemas'
import { Schema } from '../model/types'
import s from './RegisterPage.module.scss'
import { RegisterPageInputs } from './RegisterPageInputs'

export const RegisterPage = () => {
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

  const handleButtonAuthClick = () => {
    navigate(RoutePath.Login)
  }

  return (
    <div>
      <Layout variant="center" title="Регистрация">
        <Text variant="header-1" as="h1">
          Регистрация
        </Text>
        <FormProvider {...methods}>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <RegisterPageInputs />
            <Button type={'submit'} view="action">
              Отправить
            </Button>
            <Button type={'button'} onClick={handleButtonAuthClick}>
              Вход
            </Button>
          </form>
        </FormProvider>
      </Layout>
    </div>
  )
}
