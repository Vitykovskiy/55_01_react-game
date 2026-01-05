import { useAuth } from '@entities/user'
import { Button, Text } from '@gravity-ui/uikit'
import { zodResolver } from '@hookform/resolvers/zod'
import { RoutePath, usePage } from '@shared/config'
import Layout from '@shared/ui/Layout'
import { Loader } from '@shared/ui/Loader'
import { FormProvider, useForm } from 'react-hook-form'
import { Navigate, useNavigate } from 'react-router-dom'
import { REGISTER_PAGE_TITLE } from '../model/consts'
import { schema } from '../model/schemas'
import { Schema } from '../model/types'
import { useRegister } from '../model/useRegister'
import s from './RegisterPage.module.scss'
import { RegisterPageInputs } from './RegisterPageInputs'

export const RegisterPage = () => {
  usePage({})
  const methods = useForm<Schema>({
    resolver: zodResolver(schema),
    mode: 'all',
  })
  const { handleSubmit } = methods

  const navigate = useNavigate()
  const { loading, onSubmit, error } = useRegister()

  const handleButtonAuthClick = () => {
    navigate(RoutePath.Login)
  }

  const { isAuthenticated, isLoading } = useAuth()

  if (isAuthenticated) {
    return <Navigate to={RoutePath.Main} />
  }

  return (
    <Layout variant="center" title={REGISTER_PAGE_TITLE}>
      <Loader show={isLoading}>
        <div>
          <Text variant="header-1" as="h1">
            {REGISTER_PAGE_TITLE}
          </Text>
          <FormProvider {...methods}>
            <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
              <RegisterPageInputs />
              {Boolean(error) && <Text>{error}</Text>}
              <Button type={'submit'} view="action" loading={loading}>
                Отправить
              </Button>
              <Button type={'button'} onClick={handleButtonAuthClick}>
                Вход
              </Button>
            </form>
          </FormProvider>
        </div>
      </Loader>
    </Layout>
  )
}
