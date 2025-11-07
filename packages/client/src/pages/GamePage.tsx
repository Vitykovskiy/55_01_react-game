import { Helmet } from 'react-helmet'

import { usePage } from '@shared/config/routing'
import { Header } from '@shared/ui/Header'

export const GamePage = () => {
  usePage({})
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Игра</title>
        <meta
          name="description"
          content="Главная страница с информацией о пользователе"
        />
      </Helmet>
      <Header />
      <h1>Это страница игры</h1>
    </div>
  )
}
