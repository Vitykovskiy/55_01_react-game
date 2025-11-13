const PASSWORD_MIN = 8
const PASSWORD_MAX = 40
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d).+$/
const PROFILE_PAGE_TITLE = 'Профиль'

const PROFILE_DATA = {
  avatar: '/avatar/tip.png',
  first_name: 'Александр',
  second_name: 'Иванов',
  login: 'Lexa',
  password: '12345678G9',
  email: 'Lexa@mail.ru',
  phone: '88005553535',
}

export {
  PASSWORD_MAX,
  PASSWORD_MIN,
  PASSWORD_REGEX,
  PROFILE_PAGE_TITLE,
  PROFILE_DATA,
}
