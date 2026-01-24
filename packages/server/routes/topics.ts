import { Router } from 'express'
import {
  createTopic,
  getTopicById,
  getTopics,
} from '../controllers/topicController'

const router = Router()

router.get('/', getTopics)
router.get('/:id', getTopicById)
router.post('/', createTopic)

export default router
