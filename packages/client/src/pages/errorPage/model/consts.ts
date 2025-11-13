import { ErrorCode, ErrorData } from './types'

export const errorData: Record<ErrorCode, ErrorData> = {
  400: {
    heading: '400',
    text: 'Что-то не так с вашим запросом. Проверьте введённые данные и попробуйте снова.',
  },
  404: {
    heading: '404',
    text: 'Страница не найдена',
  },
  500: {
    heading: '500',
    text: 'На сервере что-то пошло не так. Мы уже разбираемся.',
  },
}
