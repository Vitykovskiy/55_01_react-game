import { Button, Text } from '@gravity-ui/uikit'
import { usePage } from '@shared/config/routing'
import Layout from '@shared/ui/Layout'
import classNames from 'classnames'
import { useNavigate } from 'react-router-dom'
import { errorData } from '../model/consts'
import { ErrorCode } from '../model/types'
import style from './ErrorPage.module.scss'

type ErrorPageProps = {
  code?: ErrorCode
}

export const ErrorPage = ({ code = 400 }: ErrorPageProps) => {
  usePage({})
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(-1)
  }

  const err = errorData[code]

  return (
    <div className={classNames(style.errorPage)}>
      <Layout variant="center" title="Ошибка">
        <Text as="h1" variant="display-1">
          {err ? err.heading : errorData[400].heading}
        </Text>
        <Text as="p" variant="body-2">
          {err ? err.text : errorData[400].text}
        </Text>
        <Button view="action" width="max" onClick={handleClick}>
          Назад
        </Button>
      </Layout>
    </div>
  )
}
