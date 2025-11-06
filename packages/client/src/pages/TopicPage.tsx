import { Helmet } from 'react-helmet'

import { usePage } from '@shared/config/routing'

export const TopicPage = () => {
  usePage({})
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Топик</title>
        <meta
          name="description"
          content="Главная страница с информацией о пользователе"
        />
      </Helmet>
      <h1>Это страница Топик форума</h1>
    </div>
  )
}
