import { Helmet } from 'react-helmet'

import { usePage } from '@shared/config/routing'
import { Header } from '@shared/ui/Header'

import FormExample from '@shared/ui/examples/FormExample'

export const RegisterPage = () => {
  usePage({})
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Регистрация</title>
        <meta
          name="description"
          content="Главная страница с информацией о пользователе"
        />
      </Helmet>
      <Header />
      <h1>Это страница Регистрация</h1>
      {/*TODO: заменить тестовый компонент формы */}
      <FormExample />
    </div>
  )
}
