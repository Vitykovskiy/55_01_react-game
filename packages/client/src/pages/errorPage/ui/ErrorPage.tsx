import { Button, Text } from '@gravity-ui/uikit'
import { usePage } from '@shared/config/routing'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import style from './ErrorPage.module.scss'
import { ErrorCode } from '@pages/errorPage/model/types'
import { errorData } from '../model/consts'

type ErrorPageProps = {
  code: ErrorCode
}

export const ErrorPage = ({ code = 400 }: ErrorPageProps) => {
  usePage({})
  const navigate = useNavigate()

  const err = errorData.find(obj => obj.codeError === code)

  return (
    <div className="App">
      <main className={classNames(style.error)}>
        <section className={classNames(style.error__content)}>
          <Text as="h1" variant="display-1">
            {err ? err.heading : errorData[0].heading}
          </Text>
          <Text variant="body-2">{err ? err.text : errorData[0].text}</Text>
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
