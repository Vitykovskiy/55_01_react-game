import { PASSWORD_MAX, PASSWORD_MIN } from './consts'
import { errorMessages } from './errors'
import { schema } from './schemas'

const validData = {
  password: 'Password123',
}

describe('schema', () => {
  test('password слишком короткий', () => {
    // Arrange
    const input = { ...validData, password: 'Pa1' }

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
    const input = { ...validData, password: 'A'.repeat(PASSWORD_MAX + 1) + '1' }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.password.max)
    }
  })

  test('password не содержит одну заглавную букву и цифру', () => {
    // Arrange
    const input = { ...validData, password: 'A'.repeat(PASSWORD_MIN) }

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
})
