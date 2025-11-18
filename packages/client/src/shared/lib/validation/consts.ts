const NAME_MAX = 80
const NAME_REGEX = /^[А-ЯЁA-Z][а-яёa-zА-ЯЁA-Z-]*$/

const LOGIN_MIN = 3
const LOGIN_MAX = 20
const LOGIN_REGEX = /^(?!\d+$)[A-Za-z0-9_-]+$/

const PASSWORD_MIN = 8
const PASSWORD_MAX = 40
const PASSWORD_REGEX = /^(?=.*[A-Z])(?=.*\d)\S+$/

const PHONE_REGEX = /^\+?\d{10,15}$/

export {
  NAME_MAX,
  NAME_REGEX,
  LOGIN_MAX,
  LOGIN_MIN,
  LOGIN_REGEX,
  PASSWORD_MAX,
  PASSWORD_MIN,
  PASSWORD_REGEX,
  PHONE_REGEX,
}
