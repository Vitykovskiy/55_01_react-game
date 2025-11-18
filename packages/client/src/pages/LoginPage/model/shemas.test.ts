import { errorMessages } from './errors'
import { schema } from './schemas'

const validData = {
  login: 'ivan123',
  password: '12345',
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

  test('ошибка в логине, потому что в нём undefined', () => {
    // Arrange
    const input = { ...validData, login: undefined }

    // Act
    const result = schema.safeParse(input)

    // Assert
    console.log(result)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues[0].message).toBe(errorMessages.login.required)
    }
  })

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
})
