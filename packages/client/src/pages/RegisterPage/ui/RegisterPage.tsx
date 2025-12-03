import { Button, Text } from '@gravity-ui/uikit'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoutePath, usePage } from '@shared/config/routing'
import { ResponseType } from '@shared/lib'
import Layout from '@shared/ui/Layout'
import { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../lib/register'
import { REGISTER_PAGE_TITLE } from '../model/consts'
import { schema } from '../model/schemas'
import { Schema } from '../model/types'
import s from './RegisterPage.module.scss'
import { RegisterPageInputs } from './RegisterPageInputs'

const ERROR_TEXT = 'Произошла ошибка регистрации'

export const RegisterPage = () => {
  usePage({})
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: 'all',
  })
  const { handleSubmit } = methods

  const navigate = useNavigate()
  const [error, setError] = useState<string | undefined>(undefined)

  const onSubmit = async (data: Schema) => {
    const result = await registerUser(data)

    if (result.type === ResponseType.Success) {
      navigate(RoutePath.Main)
      return
    }

    setError(ERROR_TEXT)
  }

  const handleButtonAuthClick = () => {
    navigate(RoutePath.Login)
  }

  return (
    <div>
      <Layout variant="center" title={REGISTER_PAGE_TITLE}>
        <Text variant="header-1" as="h1">
          {REGISTER_PAGE_TITLE}
        </Text>
        <FormProvider {...methods}>
          <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <RegisterPageInputs />
            {Boolean(error) && <Text>{error}</Text>}
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
