import { ErrorCode, ErrorData } from './types'

export const errorData: Record<ErrorCode, ErrorData> = {
  400: {
    heading: '400',
    text: 'Что-то не так с вашим запросом. Проверьте введённые данные и попробуйте снова.',
  },
  500: {
    heading: '500',
    text: 'На сервере что-то пошло не так. Мы уже разбираемся.',
  },
}
