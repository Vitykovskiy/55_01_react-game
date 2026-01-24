import { Router } from 'express'
import {
  createReaction,
  deleteReaction,
  getReactionsByComment,
} from '../controllers/reactionController'

const router = Router()

router.get('/comment/:commentId', getReactionsByComment)
router.post('/', createReaction)
router.delete('/', deleteReaction)

export default router
