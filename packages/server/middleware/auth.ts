import { NextFunction, Request, Response } from 'express'

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId = req.session.userId
  const cookies = req.session.praktikumCookies

  if (!userId || !cookies) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  req.user = { id: userId }
  return next()
}
