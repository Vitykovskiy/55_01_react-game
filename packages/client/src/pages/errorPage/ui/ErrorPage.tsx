import { Button, Text } from '@gravity-ui/uikit'
import Layout from '@shared/ui/Layout'
import { usePage } from '@shared/config/routing'
import { errorData } from '../model/consts'
import { ErrorCode } from '../model/types'
import { useNavigate } from 'react-router-dom'

type ErrorPageProps = {
  code?: ErrorCode
}

const DEFAULT_ERROR_CODE = ErrorCode.NotFound
const isNotFoundError = (code: ErrorCode) => code === ErrorCode.NotFound

export const ErrorPage = ({ code = DEFAULT_ERROR_CODE }: ErrorPageProps) => {
  usePage({})
  const navigate = useNavigate()

  const err = errorData[code] ?? errorData[DEFAULT_ERROR_CODE]
  const btnTitle = isNotFoundError(code) ? 'Назад' : 'Обновить'

  const handleAction = () =>
    isNotFoundError(code) ? navigate(-1) : window.location.reload()

  return (
    <Layout variant="center" title="Ошибка">
      <Text as="h1" variant="display-1">
        {err.heading}
      </Text>
      <Text as="p" variant="body-2">
        {err.text}
      </Text>
      <Button view="action" width="max" onClick={handleAction}>
        {btnTitle}
      </Button>
    </Layout>
  )
}
