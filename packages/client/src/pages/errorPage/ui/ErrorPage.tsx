import { Button, Text } from '@gravity-ui/uikit'
import { usePage } from '@shared/config/routing'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'
import style from './ErrorPage.module.scss'
import { ErrorCode } from '@pages/errorPage/model/types'
import { errorData } from '../model/consts'
import Layout from '@shared/ui/Layout'

type ErrorPageProps = {
  code: ErrorCode
}

export const ErrorPage = ({ code = 400 }: ErrorPageProps) => {
  usePage({})
  const navigate = useNavigate()

  const err = errorData.find(obj => obj.codeError === code)

  return (
    <div className={classNames(style.errorPage)}>
      <Layout variant="center" title="Ошибка">
        <Text as="h1" variant="display-1">
          {err ? err.heading : errorData[0].heading}
        </Text>
        <Text as="p" variant="body-2">
          {err ? err.text : errorData[0].text}
        </Text>
        <Button
          view="action"
          width="max"
          onClick={() => {
            navigate(-1)
          }}>
          Назад
        </Button>
      </Layout>
    </div>
  )
}
