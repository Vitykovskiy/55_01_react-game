import { NAME_MAX, PASSWORD_MAX } from '@shared/lib/validation'
import { errorMessages } from '@shared/lib/validation'
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
    // Arrange
    const input = { ...validData }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(true)
  })

  // firstName
  test('firstName слишком длинный', () => {
    // Arrange
    const input = { ...validData, firstName: 'A'.repeat(NAME_MAX + 1) }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.format().firstName?._errors[0]).toBe(
        errorMessages.firstName.max
      )
    }
  })

  test.each([
    ['Иван123', errorMessages.firstName.invalid],
    ['иван', errorMessages.firstName.invalid],
    ['Иван Петров', errorMessages.firstName.invalid],
    ['Иван!', errorMessages.firstName.invalid],
  ])('firstName "%s" невалиден', (value, message) => {
    // Arrange
    const input = { ...validData, firstName: value }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.format().firstName?._errors[0]).toBe(message)
    }
  })

  test('firstName c дефисом в середине', () => {
    // Arrange
    const input = { ...validData, firstName: 'Анна-Мария' }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(true)
  })

  // lastName
  test('lastName слишком длинный', () => {
    // Arrange
    const input = { ...validData, lastName: 'A'.repeat(NAME_MAX + 1) }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.format().lastName?._errors[0]).toBe(
        errorMessages.lastName.max
      )
    }
  })

  // Email
  test.each([
    ['invalid', errorMessages.email.invalid],
    ['user.example.com', errorMessages.email.invalid],
    ['user@examplecom', errorMessages.email.invalid],
  ])('email "%s" невалиден', (value, message) => {
    // Arrange
    const input = { ...validData, email: value }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.format().email?._errors[0]).toBe(message)
    }
  })

  // login
  test('login undefined', () => {
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

  // Password
  test('password undefined', () => {
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

  // Phone
  test.each([
    ['123', errorMessages.phone.invalid],
    ['+42012A45678', errorMessages.phone.invalid],
  ])('phone "%s" невалиден', (value, message) => {
    // Arrange
    const input = { ...validData, phone: value }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.format().phone?._errors[0]).toBe(message)
    }
  })

  test('phone без плюса, только цифры', () => {
    // Arrange
    const input = { ...validData, phone: '1234567890' }
    // Act
    const result = schema.safeParse(input)
    // Assert
    expect(result.success).toBe(true)
  })
})
