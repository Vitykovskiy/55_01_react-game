import { Helmet } from 'react-helmet'
import { Button } from '@gravity-ui/uikit'
// import {Text} from '@gravity-ui/uikit';
import { usePage } from '@shared/config/routing'
// import { Header } from '@shared/ui/Header';
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import style from './ErrorPage.module.scss'

export const ErrorPage = ({ code = 400 }) => {
  usePage({})
  const navigate = useNavigate()

  const errorData = [
    {
      id: 1,
      codeError: 400,
      heading: '400',
      text: 'Что-то не так с вашим запросом. Проверьте введённые данные и попробуйте снова.',
    },
    {
      id: 2,
      codeError: 500,
      heading: '500',
      text: 'На сервере что-то пошло не так. Мы уже разбираемся.',
    },
  ]

  const err = errorData.find(obj => obj.codeError === code)

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Ошибка</title>
        <meta name="description" content="Страница не найдена" />
      </Helmet>
      {/* <Header /> */}
      <main className={classNames(style.error)}>
        <section className={classNames(style.error__content)}>
          <h1 className={classNames(style.error__heading)}>
            {err ? err.heading : errorData[0].heading}
          </h1>
          <p className={classNames(style.error__text)}>
            {err ? err.text : errorData[0].text}
          </p>
          <Button
            view="action"
            width="max"
            onClick={() => {
              navigate(-1)
            }}>
            Назад
          </Button>
        </section>
      </main>
    </div>
  )
}
