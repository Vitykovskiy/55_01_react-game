import { Router } from 'express'
import { getIam, logout, signin } from '../controllers/authController'
import { requireAuth } from '../middleware/auth'

const router = Router()

router.post('/auth/signin', signin)
router.post('/auth/logout', requireAuth, logout)
router.get('/iam', requireAuth, getIam)

export default router
