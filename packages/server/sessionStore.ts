import crypto from 'crypto'

export type Session = {
  login: string
  praktikumCookies: string[]
  createdAt: number
}

const sessions = new Map<string, Session>()

const generateSessionId = (): string => crypto.randomBytes(32).toString('hex')

export const createSession = (
  login: string,
  praktikumCookies: string[]
): string => {
  const sid = generateSessionId()
  sessions.set(sid, {
    login,
    praktikumCookies,
    createdAt: Date.now(),
  })
  return sid
}

export const getSession = (sid: string): Session | null => {
  return sessions.get(sid) || null
}
