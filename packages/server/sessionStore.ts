import crypto from 'crypto'

export type Session = {
  login: string
  praktikumCookies: string[]
  createdAt: number
}

const sessions = new Map<string, Session>()

const SESSION_ID_BYTES = 32

const generateSessionId = (): string =>
  crypto.randomBytes(SESSION_ID_BYTES).toString('hex')

export const createSession = (
  login: string,
  praktikumCookies: string[]
): string => {
  const sessionId = generateSessionId()
  sessions.set(sessionId, {
    login,
    praktikumCookies,
    createdAt: Date.now(),
  })
  return sessionId
}

export const getSession = (sessionId: string): Session | null => {
  return sessions.get(sessionId) || null
}
