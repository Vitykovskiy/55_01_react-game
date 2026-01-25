import setCookieParser from 'set-cookie-parser'

const getSetCookieHeaderValues = (headers: Headers): string[] => {
  const maybeGetSetCookie = (headers as any).getSetCookie
  if (typeof maybeGetSetCookie === 'function') {
    const values = maybeGetSetCookie.call(headers) as unknown
    if (Array.isArray(values)) {
      return values.filter(
        (value): value is string => typeof value === 'string'
      )
    }
  }

  const maybeRaw = (headers as any).raw
  if (typeof maybeRaw === 'function') {
    const raw = maybeRaw.call(headers) as unknown
    const setCookieValues = (raw as any)?.['set-cookie']
    if (Array.isArray(setCookieValues)) {
      return setCookieValues.filter(
        (value): value is string => typeof value === 'string'
      )
    }
  }

  const single = headers.get('set-cookie')
  return single ? [single] : []
}

export const encodeCookieValueForHeader = (value: string): string => {
  let out = ''
  for (const ch of value) {
    const code = ch.charCodeAt(0)
    const isAllowed =
      code === 0x21 ||
      (code >= 0x23 && code <= 0x2b) ||
      (code >= 0x2d && code <= 0x3a) ||
      (code >= 0x3c && code <= 0x5b) ||
      (code >= 0x5d && code <= 0x7e)

    out += isAllowed ? ch : encodeURIComponent(ch)
  }
  return out
}

export const buildCookieHeader = (cookies: Record<string, string>): string =>
  Object.entries(cookies)
    .map(([name, value]) => `${name}=${encodeCookieValueForHeader(value)}`)
    .join('; ')

export const extractCookieMapFromHeaders = (
  headers: Headers
): Record<string, string> => {
  const setCookieHeader = getSetCookieHeaderValues(headers)

  const parsed = setCookieParser.parse(setCookieHeader, { map: true })
  const cookieMap: Record<string, string> = {}
  for (const key of Object.keys(parsed)) {
    cookieMap[key] = parsed[key].value
  }
  return cookieMap
}
