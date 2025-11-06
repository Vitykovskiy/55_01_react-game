import { Helmet } from 'react-helmet'

import { usePage } from '@shared/config/routing'
import { Header } from '@shared/ui/Header'

export const ForumPage = () => {
  usePage({})
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Форум</title>
        <meta
          name="description"
          content="Главная страница с информацией о пользователе"
        />
      </Helmet>
      <Header />
      <h1>Это страница Форума</h1>
    </div>
  )
}
