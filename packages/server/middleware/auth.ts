import { NextFunction, Request, Response } from 'express'
import { getSession } from '../sessionStore'

const PUBLIC_PATHS = new Set(['/auth/signin'])

const parseCookies = (cookieHeader?: string): Record<string, string> => {
  if (!cookieHeader) {
    return {}
  }

  return cookieHeader.split(';').reduce<Record<string, string>>((acc, part) => {
    const [rawKey, ...rest] = part.trim().split('=')
    if (!rawKey) {
      return acc
    }

    acc[rawKey] = decodeURIComponent(rest.join('='))
    return acc
  }, {})
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.method === 'OPTIONS') {
    return next()
  }

  if (PUBLIC_PATHS.has(req.path)) {
    return next()
  }

  const cookies = parseCookies(req.headers.cookie)
  const sid = cookies.bff_sid

  if (!sid) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  const session = getSession(sid)
  if (!session) {
    return res.status(401).json({ message: 'Unauthorized' })
  }

  ;(req as Request & { session?: typeof session }).session = session
  return next()
}
