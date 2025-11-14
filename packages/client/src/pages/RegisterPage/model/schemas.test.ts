import { NAME_MAX, PASSWORD_MAX } from '@shared/model/validation/consts'
import { errorMessages } from '@shared/model/validation/errors'
import { schema } from './schemas'

const validData = {
  firstName: 'Иван',
  lastName: 'Петров',
  email: 'test@example.com',
  login: 'ivan123',
  password: 'IvanPassword12345',
  phone: '+420123456789',
}

describe('schema', () => {
  test('валидные данные проходят валидацию', () => {
    const input = { ...validData }
    const result = schema.safeParse(input)
    expect(result.success).toBe(true)
  })

  // firstName
  test('firstName слишком длинный', () => {
    const input = { ...validData, firstName: 'A'.repeat(NAME_MAX + 1) }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.firstName.max)
    }
  })

  test('firstName с маленькой буквы', () => {
    const input = { ...validData, firstName: 'иван' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        errorMessages.firstName.invalid
      )
    }
  })

  test('firstName с цифрами', () => {
    const input = { ...validData, firstName: 'Иван123' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        errorMessages.firstName.invalid
      )
    }
  })

  test('firstName с пробелом', () => {
    const input = { ...validData, firstName: 'Иван Петров' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        errorMessages.firstName.invalid
      )
    }
  })

  test('firstName с недопустимым спецсимволом', () => {
    const input = { ...validData, firstName: 'Иван!' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        errorMessages.firstName.invalid
      )
    }
  })

  test('firstName c дефисом в середине', () => {
    const input = { ...validData, firstName: 'Анна-Мария' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(true)
  })

  // lastName
  test('lastName слишком длинный', () => {
    const input = { ...validData, lastName: 'A'.repeat(NAME_MAX + 1) }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.lastName.max)
    }
  })

  // email
  test('email невалиден', () => {
    const input = { ...validData, email: 'invalid' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.email.invalid)
    }
  })

  test('email без собаки', () => {
    const input = { ...validData, email: 'user.example.com' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.email.invalid)
    }
  })

  test('email без точки после собаки', () => {
    const input = { ...validData, email: 'user@examplecom' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.email.invalid)
    }
  })

  // login
  test('ошибка в логине, потому что в нём undefined', () => {
    const input = { ...validData, login: undefined }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.login.required)
    }
  })

  test('login слишком короткий', () => {
    const input = { ...validData, login: 'iv' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.login.min)
    }
  })

  test('login — только цифры', () => {
    const input = { ...validData, login: '123456' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.login.invalid)
    }
  })

  test('login с пробелом', () => {
    const input = { ...validData, login: 'ivan 123' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.login.invalid)
    }
  })

  test('login с запрещённым спецсимволом', () => {
    const input = { ...validData, login: 'ivan$123' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.login.invalid)
    }
  })

  test('login с дефисом и подчёркиванием', () => {
    const input = { ...validData, login: 'ivan-123_test' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(true)
  })

  // password
  test('ошибка в password, потому что в нём undefined', () => {
    const input = { ...validData, password: undefined }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        errorMessages.password.required
      )
    }
  })

  test('password слишком короткий', () => {
    const input = { ...validData, password: '1234' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.password.min)
    }
  })

  test('password слишком длинный', () => {
    const input = { ...validData, password: 'A'.repeat(PASSWORD_MAX + 1) }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.password.max)
    }
  })

  test('password без заглавных букв', () => {
    const input = { ...validData, password: 'password123' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        errorMessages.password.invalid
      )
    }
  })

  test('password без цифр', () => {
    const input = { ...validData, password: 'Password' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        errorMessages.password.invalid
      )
    }
  })

  test('password c заглавной и цифрой', () => {
    const input = { ...validData, password: 'Passw0rd' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(true)
  })

  // phone
  test('phone невалидный', () => {
    const input = { ...validData, phone: '123' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.phone.invalid)
    }
  })

  test('phone c буквами', () => {
    const input = { ...validData, phone: '+42012A45678' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.phone.invalid)
    }
  })

  test('phone без плюса, только цифры', () => {
    const input = { ...validData, phone: '1234567890' }
    const result = schema.safeParse(input)
    expect(result.success).toBe(true)
  })
})
