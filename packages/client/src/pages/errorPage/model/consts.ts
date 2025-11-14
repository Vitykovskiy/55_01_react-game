import { ErrorCode, ErrorData } from './types'

export const errorData: Record<ErrorCode, ErrorData> = {
  [ErrorCode.BadRequest]: {
    heading: '400',
    text: 'Что-то не так с вашим запросом. Проверьте введённые данные и попробуйте снова.',
  },
  [ErrorCode.NotFound]: {
    heading: '404',
    text: 'Страница не найдена',
  },
  [ErrorCode.ServerError]: {
    heading: '500',
    text: 'На сервере что-то пошло не так. Мы уже разбираемся.',
  },
}
