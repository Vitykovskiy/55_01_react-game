const stripHtmlTags = (input: string): string => input.replace(/<[^>]*>/g, '')

type ParseResult<T> = { ok: true; value: T } | { ok: false; message: string }

export const requireInt = (
  value: unknown,
  fieldName: string,
  options?: { min?: number; max?: number }
): ParseResult<number> => {
  const numericValue = typeof value === 'number' ? value : Number(value)

  if (!Number.isInteger(numericValue)) {
    return { ok: false, message: `${fieldName} must be an integer` }
  }

  if (options?.min !== undefined && numericValue < options.min) {
    return {
      ok: false,
      message: `${fieldName} must be at least ${options.min}`,
    }
  }

  if (options?.max !== undefined && numericValue > options.max) {
    return { ok: false, message: `${fieldName} must be at most ${options.max}` }
  }

  return { ok: true, value: numericValue }
}

export const optionalInt = (
  value: unknown,
  fieldName: string,
  options?: { min?: number; max?: number }
): ParseResult<number | null> => {
  if (value === undefined || value === null || value === '') {
    return { ok: true, value: null }
  }

  const numericValue = typeof value === 'number' ? value : Number(value)
  if (!Number.isInteger(numericValue)) {
    return { ok: false, message: `${fieldName} must be an integer` }
  }

  if (options?.min !== undefined && numericValue < options.min) {
    return {
      ok: false,
      message: `${fieldName} must be at least ${options.min}`,
    }
  }

  if (options?.max !== undefined && numericValue > options.max) {
    return { ok: false, message: `${fieldName} must be at most ${options.max}` }
  }

  return { ok: true, value: numericValue }
}

export const requireText = (
  value: unknown,
  fieldName: string,
  options?: { maxLength?: number }
): ParseResult<string> => {
  if (typeof value !== 'string') {
    return { ok: false, message: `${fieldName} must be a string` }
  }

  const sanitized = stripHtmlTags(value).trim()
  if (!sanitized) {
    return { ok: false, message: `${fieldName} must not be empty` }
  }

  if (options?.maxLength && sanitized.length > options.maxLength) {
    return {
      ok: false,
      message: `${fieldName} must be at most ${options.maxLength} characters`,
    }
  }

  return { ok: true, value: sanitized }
}
