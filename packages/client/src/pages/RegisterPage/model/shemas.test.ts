import { NAME_MAX, PASSWORD_MAX } from './consts'
import { errorMessages } from './errors'
import { schema } from './schemas'

const validData = {
  firstName: 'Иван',
  lastName: 'Петров',
  email: 'test@example.com',
  login: 'ivan123',
  password: '12345',
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

  test('firstName слишком короткий', () => {
    // Arrange
    const input = { ...validData, firstName: '' }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.firstName.min)
    }
  })

  test('firstName слишком длинный', () => {
    // Arrange
    const input = { ...validData, firstName: 'A'.repeat(NAME_MAX + 1) }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.firstName.max)
    }
  })

  test('lastName слишком короткий', () => {
    // Arrange
    const input = { ...validData, lastName: '' }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.lastName.min)
    }
  })

  test('lastName слишком длинный', () => {
    // Arrange
    const input = { ...validData, lastName: 'A'.repeat(NAME_MAX + 1) }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.lastName.max)
    }
  })

  test('email невалиден', () => {
    // Arrange
    const input = { ...validData, email: 'invalid' }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.email.invalid)
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
      expect(result.error.issues[0].message).toBe(errorMessages.login.min)
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

  test('phone невалидный', () => {
    // Arrange
    const input = { ...validData, phone: '123' }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.phone.invalid)
    }
  })
})
