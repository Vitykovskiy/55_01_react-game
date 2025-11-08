import { Helmet } from 'react-helmet'

import { Button } from '@gravity-ui/uikit'
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
      {/*Пример использования компонента из ui-kit*/}
      {/*TODO удалить все компентарии и кнопку при разработке MainPage*/}
      <Button view="action">Кнопка на главной странице</Button>
    </div>
  )
}
