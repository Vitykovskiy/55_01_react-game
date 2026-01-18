import { Router } from 'express'
import { getUser, logout, signin } from '../controllers/authController'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.post('/auth/signin', signin)
router.post('/auth/logout', requireAuth, logout)
router.get('/auth/user', requireAuth, getUser)

export default router
