import { Request, Response } from 'express'
import { Topic } from '../models'
import { requireInt, requireText } from '../utils/validation'

export const getTopics = async (
  _req: Request,
  res: Response
): Promise<Response> => {
  try {
    const topics = await Topic.findAll({
      order: [['createdAt', 'DESC']],
    })
    return res.json(topics)
  } catch (error) {
    console.error('Failed to fetch topics', error)
    return res.status(500).json({ message: 'Failed to fetch topics' })
  }
}

export const getTopicById = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const parsedId = requireInt(req.params.id, 'id', { min: 1 })
  if (!parsedId.ok) {
    return res.status(400).json({ message: parsedId.message })
  }

  try {
    const topic = await Topic.findByPk(parsedId.value)
    if (!topic) {
      return res.status(404).json({ message: 'Topic not found' })
    }
    return res.json(topic)
  } catch (error) {
    console.error('Failed to fetch topic', error)
    return res.status(500).json({ message: 'Failed to fetch topic' })
  }
}

export const createTopic = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const title = requireText(req.body.title, 'title', { maxLength: 255 })
  if (!title.ok) {
    return res.status(400).json({ message: title.message })
  }

  const content = requireText(req.body.content, 'content', { maxLength: 10000 })
  if (!content.ok) {
    return res.status(400).json({ message: content.message })
  }

  if (!req.user?.id) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  try {
    const topic = await Topic.create({
      title: title.value,
      content: content.value,
      userId: req.user.id,
    })
    return res.status(201).json(topic)
  } catch (error) {
    console.error('Failed to create topic', error)
    return res.status(500).json({ message: 'Failed to create topic' })
  }
}
