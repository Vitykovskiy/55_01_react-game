import { Request, Response } from 'express'
import setCookieParser from 'set-cookie-parser'
import { requireText } from '../utils/validation'

const PRAKTIKUM_API_BASE_URL = 'https://ya-praktikum.tech/api/v2'

type PraktikumUser = {
  id: number
  first_name?: string
  second_name?: string
  display_name?: string
  login?: string
  avatar?: string | null
  email?: string
  phone?: string
}

const buildCookieHeader = (cookies: Record<string, string>): string =>
  Object.entries(cookies)
    .map(([name, value]) => `${name}=${value}`)
    .join('; ')

const extractCookieMap = (
  response: globalThis.Response
): Record<string, string> => {
  const setCookieHeader =
    (
      response.headers as unknown as { getSetCookie?: () => string[] }
    ).getSetCookie?.() ??
    (response.headers.get('set-cookie')
      ? [response.headers.get('set-cookie') as string]
      : [])

  const parsed = setCookieParser.parse(setCookieHeader, { map: true })
  const cookieMap: Record<string, string> = {}
  for (const key of Object.keys(parsed)) {
    cookieMap[key] = parsed[key].value
  }
  return cookieMap
}

const fetchPraktikumUser = async (
  cookies: Record<string, string>
): Promise<
  { ok: true; user: PraktikumUser } | { ok: false; status: number }
> => {
  const response = await fetch(`${PRAKTIKUM_API_BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      cookie: buildCookieHeader(cookies),
    },
  })

  if (!response.ok) {
    return { ok: false, status: response.status }
  }

  const user = (await response.json()) as PraktikumUser
  return { ok: true, user }
}

export const signin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const login = requireText(req.body.login, 'login', { maxLength: 100 })
  if (!login.ok) {
    return res.status(400).json({ message: login.message })
  }

  const password = requireText(req.body.password, 'password', {
    maxLength: 200,
  })
  if (!password.ok) {
    return res.status(400).json({ message: password.message })
  }

  try {
    const response = await fetch(`${PRAKTIKUM_API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        login: login.value,
        password: password.value,
      }),
    })

    if (!response.ok) {
      const message = await response.text().catch(() => '')
      return res.status(response.status).json({
        message: message || 'Failed to sign in',
      })
    }

    const cookieMap = extractCookieMap(response)
    if (Object.keys(cookieMap).length === 0) {
      return res.status(500).json({ message: 'No auth cookies received' })
    }

    req.session.praktikumCookies = cookieMap

    const userResponse = await fetchPraktikumUser(cookieMap)
    if (!userResponse.ok) {
      req.session.praktikumCookies = undefined
      req.session.userId = undefined
      return res.status(403).json({ message: 'Forbidden' })
    }

    req.session.userId = userResponse.user.id
    req.user = { id: userResponse.user.id }

    return res.status(200).json(userResponse.user)
  } catch (error) {
    console.error('Failed to sign in', error)
    return res.status(500).json({ message: 'Failed to sign in' })
  }
}

export const getIam = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const cookieMap = req.session.praktikumCookies
  if (!cookieMap || !req.session.userId) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  try {
    const userResponse = await fetchPraktikumUser(cookieMap)
    if (!userResponse.ok) {
      req.session.praktikumCookies = undefined
      req.session.userId = undefined
      return res.status(403).json({ message: 'Forbidden' })
    }

    req.session.userId = userResponse.user.id
    req.user = { id: userResponse.user.id }

    return res.status(200).json(userResponse.user)
  } catch (error) {
    console.error('Failed to fetch current user', error)
    return res.status(500).json({ message: 'Failed to fetch current user' })
  }
}

export const logout = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const cookieMap = req.session.praktikumCookies

  try {
    if (cookieMap) {
      await fetch(`${PRAKTIKUM_API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          cookie: buildCookieHeader(cookieMap),
        },
      }).catch(() => undefined)
    }

    req.session.destroy(() => undefined)
    res.clearCookie('forum_sid')
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Failed to logout', error)
    return res.status(500).json({ message: 'Failed to logout' })
  }
}
