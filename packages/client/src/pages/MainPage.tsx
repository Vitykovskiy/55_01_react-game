import { Helmet } from 'react-helmet'

import { usePage } from '@shared/config/routing'
import { Header } from '@shared/ui/Header'

export const MainPage = () => {
  usePage({})
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Главная</title>
        <meta
          name="description"
          content="Главная страница с информацией о пользователе"
        />
      </Helmet>
      <Header />
      <h1>Это страница Главная</h1>
    </div>
  )
}
