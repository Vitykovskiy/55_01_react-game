import { Helmet } from 'react-helmet'

import { Button } from '@gravity-ui/uikit'
import { usePage } from '@shared/config/routing'
import { Header } from '@shared/ui/Header'
import classNames from 'classnames'
// Импортируем стили как объект
import s from './MainPage.module.scss'

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
      {/*! В коде TS пишем используем названия из импортируемого объекта, в нём они лежат уже в camelCase*/}
      {/*! Если классов нужно несколько, то используем утилиту classNames*/}
      <main className={classNames(s.mainPage, s.mainPageWarning)}>
        <h1>Это страница Главная</h1>
        {/*Пример использования компонента из ui-kit*/}
        {/*TODO удалить все компентарии и кнопку при разработке MainPage*/}

        {/*! Если один класс, то нужно использовать без classNames*/}
        <Button className={s.button} view="action">
          Кнопка на главной странице
        </Button>
      </main>
    </div>
  )
}
