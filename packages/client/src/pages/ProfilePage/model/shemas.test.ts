import { PASSWORD_MAX } from './consts'
import { errorMessages } from './errors'
import { schema } from './schemas'

describe('schema', () => {
  test('password слишком короткий', () => {
    // Arrange
    const input = { password: 'Pa1' }

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
    const input = { password: 'A'.repeat(PASSWORD_MAX + 1) }

    // Act
    const result = schema.safeParse(input)

    // Assert
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.password.max)
    }
  })
})
