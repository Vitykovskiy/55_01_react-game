import { Router } from 'express'
import {
  createReplyHandler,
  getRepliesByComment,
} from '../controllers/commentController'

const router = Router()

router.get('/:commentId', getRepliesByComment)
router.post('/', createReplyHandler)

export default router
