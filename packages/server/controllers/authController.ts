import { Request, Response } from 'express'
import {
  buildCookieHeader,
  extractCookieMapFromHeaders,
} from '../utils/cookies'
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

const fetchPraktikumUser = async (
  cookies: Record<string, string>
): Promise<
  | { ok: true; user: PraktikumUser }
  | { ok: false; status: number; message?: string }
> => {
  let response: globalThis.Response
  try {
    response = await fetch(`${PRAKTIKUM_API_BASE_URL}/auth/user`, {
      method: 'GET',
      headers: {
        cookie: buildCookieHeader(cookies),
      },
    })
  } catch (error) {
    console.error('Failed to fetch Praktikum user', error)
    return { ok: false, status: 503, message: 'Network error' }
  }

  if (!response.ok) {
    const message = await response.text().catch(() => '')
    return { ok: false, status: response.status, message: message || undefined }
  }

  const user = (await response.json()) as PraktikumUser
  return { ok: true, user }
}

export const signin = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const body = typeof req.body === 'object' && req.body !== null ? req.body : {}
  const login = requireText((body as { login?: unknown }).login, 'login', {
    maxLength: 100,
  })
  if (!login.ok) {
    return res.status(400).json({ message: login.message })
  }

  const password = requireText(
    (body as { password?: unknown }).password,
    'password',
    {
      maxLength: 200,
    }
  )
  if (!password.ok) {
    return res.status(400).json({ message: password.message })
  }

  try {
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 7000)
    const response = await fetch(`${PRAKTIKUM_API_BASE_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        login: login.value,
        password: password.value,
      }),
    }).finally(() => clearTimeout(timeoutId))

    if (!response.ok) {
      const message = await response.text().catch(() => '')
      return res.status(response.status).json({
        message: message || 'Failed to sign in',
      })
    }

    let userFromSignin: PraktikumUser | null = null
    const responseText = await response.text().catch(() => '')
    if (responseText) {
      try {
        const parsed = JSON.parse(responseText) as Partial<PraktikumUser>
        if (typeof parsed === 'object' && parsed !== null && 'id' in parsed) {
          userFromSignin = parsed as PraktikumUser
        }
      } catch {
        userFromSignin = null
      }
    }

    const cookieMap = extractCookieMapFromHeaders(response.headers)
    if (Object.keys(cookieMap).length === 0) {
      return res.status(500).json({ message: 'No auth cookies received' })
    }

    req.session.authCookies = cookieMap

    if (userFromSignin) {
      req.session.userId = userFromSignin.id
      req.user = { id: userFromSignin.id }
      return res.status(200).json(userFromSignin)
    }

    const userResponse = await fetchPraktikumUser(cookieMap)
    if (!userResponse.ok) {
      if (userResponse.status === 401 || userResponse.status === 403) {
        req.session.authCookies = undefined
        req.session.userId = undefined
        return res.status(403).json({ message: 'Forbidden' })
      }

      return res.status(502).json({
        message: userResponse.message || 'Auth service unavailable',
      })
    }

    req.session.userId = userResponse.user.id
    req.user = { id: userResponse.user.id }

    return res.status(200).json(userResponse.user)
  } catch (error) {
    console.error('Failed to sign in', error)
    return res.status(500).json({ message: 'Failed to sign in' })
  }
}

export const getUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const cookieMap = req.session.authCookies
  if (!cookieMap || !req.session.userId) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  try {
    const userResponse = await fetchPraktikumUser(cookieMap)
    if (!userResponse.ok) {
      if (userResponse.status === 401 || userResponse.status === 403) {
        req.session.authCookies = undefined
        req.session.userId = undefined
        return res.status(403).json({ message: 'Forbidden' })
      }

      return res.status(502).json({
        message: userResponse.message || 'Auth service unavailable',
      })
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
  const cookieMap = req.session.authCookies

  try {
    if (cookieMap) {
      await fetch(`${PRAKTIKUM_API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          cookie: buildCookieHeader(cookieMap),
        },
      }).catch(() => undefined)
    }

    const destroyError = await new Promise<Error | null>(resolve => {
      req.session.destroy(error => resolve(error ?? null))
    })
    if (destroyError) {
      console.error('Failed to destroy session', destroyError)
      return res.status(500).json({ message: 'Failed to logout' })
    }

    res.clearCookie('forum_sid')
    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Failed to logout', error)
    return res.status(500).json({ message: 'Failed to logout' })
  }
}
