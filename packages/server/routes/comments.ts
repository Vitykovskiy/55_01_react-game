import { Router } from 'express'
import {
  createComment,
  getCommentsByTopic,
} from '../controllers/commentController'

const router = Router()

router.get('/topic/:topicId', getCommentsByTopic)
router.post('/topic/:topicId', createComment)
router.post('/', createComment)

export default router
