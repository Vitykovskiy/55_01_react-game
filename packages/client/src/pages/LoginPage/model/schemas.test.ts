import { PASSWORD_MAX } from '@shared/model/validation/consts'
import { errorMessages } from '@shared/model/validation/errors'
import { schema } from './schemas'

const validData = {
  login: 'ivan123',
  password: 'IvanPassword12345',
}

describe('schema', () => {
  test('валидные данные проходят валидацию', () => {
    const input = { ...validData }
    const result = schema.safeParse(input)
    expect(result.success).toBe(true)
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
})
