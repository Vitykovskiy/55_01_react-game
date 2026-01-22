import 'express-session'

declare module 'express-session' {
  interface SessionData {
    authCookies?: Record<string, string>
    userId?: number
  }
}
