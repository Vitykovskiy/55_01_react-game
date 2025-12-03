import { PASSWORD_MAX, errorMessages } from '@shared/lib/validation'
import { schema } from './schemas'

const validData = {
  login: 'ivan123',
  password: 'IvanPassword12345',
}

describe('schema', () => {
  test('валидные данные проходят валидацию', () => {
    // Arrange
    const input = { ...validData }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(true)
  })

  // login
  test('ошибка в логине, потому что в нём undefined', () => {
    // Arrange
    const input = { ...validData, login: undefined }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.format().login?._errors[0]).toBe(
        errorMessages.login.required
      )
    }
  })

  test('login слишком короткий', () => {
    // Arrange
    const input = { ...validData, login: 'iv' }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.format().login?._errors[0]).toBe(
        errorMessages.login.min
      )
    }
  })

  test.each([
    ['123456', errorMessages.login.invalid],
    ['ivan 123', errorMessages.login.invalid],
    ['ivan$123', errorMessages.login.invalid],
  ])('login "%s" невалиден', (value, message) => {
    // Arrange
    const input = { ...validData, login: value }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.format().login?._errors[0]).toBe(message)
    }
  })

  test('login с дефисом и подчёркиванием', () => {
    // Arrange
    const input = { ...validData, login: 'ivan-123_test' }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(true)
  })

  // password
  test('ошибка в password, потому что в нём undefined', () => {
    // Arrange
    const input = { ...validData, password: undefined }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.format().password?._errors[0]).toBe(
        errorMessages.password.required
      )
    }
  })

  test('password слишком короткий', () => {
    // Arrange
    const input = { ...validData, password: '1234' }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.format().password?._errors[0]).toBe(
        errorMessages.password.min
      )
    }
  })

  test('password слишком длинный', () => {
    // Arrange
    const input = { ...validData, password: 'A'.repeat(PASSWORD_MAX + 1) }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.format().password?._errors[0]).toBe(
        errorMessages.password.max
      )
    }
  })

  test.each([
    ['password123', errorMessages.password.invalid],
    ['Password', errorMessages.password.invalid],
  ])('password "%s" невалиден', (value, message) => {
    // Arrange
    const input = { ...validData, password: value }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.format().password?._errors[0]).toBe(message)
    }
  })

  test('password c заглавной и цифрой', () => {
    // Arrange
    const input = { ...validData, password: 'Passw0rd' }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(true)
  })
})
