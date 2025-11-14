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
      expect(result.error.issues[0].message).toBe(errorMessages.firstName.max)
    }
  })

  test('firstName с маленькой буквы', () => {
    // Arrange
    const input = { ...validData, firstName: 'иван' }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        errorMessages.firstName.invalid
      )
    }
  })

  test('firstName с цифрами', () => {
    // Arrange
    const input = { ...validData, firstName: 'Иван123' }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        errorMessages.firstName.invalid
      )
    }
  })

  test('firstName с пробелом', () => {
    // Arrange
    const input = { ...validData, firstName: 'Иван Петров' }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        errorMessages.firstName.invalid
      )
    }
  })

  test('firstName с недопустимым спецсимволом', () => {
    // Arrange
    const input = { ...validData, firstName: 'Иван!' }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(
        errorMessages.firstName.invalid
      )
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
      expect(result.error.issues[0].message).toBe(errorMessages.lastName.max)
    }
  })

  // Email

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

  test('email без собаки', () => {
    // Arrange
    const input = { ...validData, email: 'user.example.com' }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.email.invalid)
    }
  })

  test('email без точки после собаки', () => {
    // Arrange
    const input = { ...validData, email: 'user@examplecom' }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.email.invalid)
    }
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
      expect(result.error.issues[0].message).toBe(errorMessages.login.required)
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

  // Phone

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

  test('phone c буквами', () => {
    // Arrange
    const input = { ...validData, phone: '+42012A45678' }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.phone.invalid)
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
