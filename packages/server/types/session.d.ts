import 'express-session'

declare module 'express-session' {
  interface SessionData {
    praktikumCookies?: Record<string, string>
    userId?: number
  }
}
