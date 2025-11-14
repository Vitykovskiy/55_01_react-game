import { PASSWORD_MAX } from '@shared/lib/validation'
import { errorMessages } from '@shared/lib/validation'
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
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.login.required)
    }
  })

  test('login слишком короткий', () => {
    // Arrange
    const input = { ...validData, login: 'iv' }

    // Act
    const result = schema.safeParse(input)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.login.min)
    }
  })

  test('login — только цифры', () => {
    // Arrange
    const input = { ...validData, login: '123456' }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.login.invalid)
    }
  })

  test('login с пробелом', () => {
    // Arrange
    const input = { ...validData, login: 'ivan 123' }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.login.invalid)
    }
  })

  test('login с запрещённым спецсимволом', () => {
    // Arrange
    const input = { ...validData, login: 'ivan$123' }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.login.invalid)
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

  // Password

  test('ошибка в password, потому что в нём undefined', () => {
    // Arrange
    const input = { ...validData, password: undefined }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
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
      expect(result.error.issues[0].message).toBe(errorMessages.password.min)
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
      expect(result.error.issues[0].message).toBe(errorMessages.password.max)
    }
  })

  test('password без заглавных букв', () => {
    // Arrange
    const input = { ...validData, password: 'password123' }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        errorMessages.password.invalid
      )
    }
  })

  test('password без цифр', () => {
    // Arrange
    const input = { ...validData, password: 'Password' }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        errorMessages.password.invalid
      )
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
