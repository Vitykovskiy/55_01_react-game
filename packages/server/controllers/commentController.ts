import { Request, Response } from 'express'
import { Comment } from '../models'
import { optionalInt, requireInt, requireText } from '../utils/validation'

export const getCommentsByTopic = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const topicId = requireInt(req.params.topicId, 'topicId', { min: 1 })
  if (!topicId.ok) {
    return res.status(400).json({ message: topicId.message })
  }

  try {
    const comments = await Comment.findAll({
      where: { topicId: topicId.value },
      order: [
        ['parentCommentId', 'ASC'],
        ['createdAt', 'ASC'],
      ],
    })
    return res.json(comments)
  } catch (error) {
    console.error('Failed to fetch comments', error)
    return res.status(500).json({ message: 'Failed to fetch comments' })
  }
}

export const createComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const content = requireText(req.body.content, 'content', { maxLength: 5000 })
  if (!content.ok) {
    return res.status(400).json({ message: content.message })
  }

  if (!req.user?.id) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const topicId = requireInt(req.body.topicId, 'topicId', { min: 1 })
  if (!topicId.ok) {
    return res.status(400).json({ message: topicId.message })
  }

  const parentCommentId = optionalInt(
    req.body.parentCommentId,
    'parentCommentId',
    {
      min: 1,
    }
  )
  if (!parentCommentId.ok) {
    return res.status(400).json({ message: parentCommentId.message })
  }

  try {
    const comment = await Comment.create({
      content: content.value,
      userId: req.user.id,
      topicId: topicId.value,
      parentCommentId: parentCommentId.value,
    })
    return res.status(201).json(comment)
  } catch (error) {
    console.error('Failed to create comment', error)
    return res.status(500).json({ message: 'Failed to create comment' })
  }
}

export const getRepliesByComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const commentId = requireInt(req.params.commentId, 'commentId', { min: 1 })
  if (!commentId.ok) {
    return res.status(400).json({ message: commentId.message })
  }

  try {
    const replies = await Comment.findAll({
      where: { parentCommentId: commentId.value },
      order: [['createdAt', 'ASC']],
    })
    return res.json(replies)
  } catch (error) {
    console.error('Failed to fetch replies', error)
    return res.status(500).json({ message: 'Failed to fetch replies' })
  }
}

export const createReply = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const content = requireText(req.body.content, 'content', { maxLength: 5000 })
  if (!content.ok) {
    return res.status(400).json({ message: content.message })
  }

  if (!req.user?.id) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const topicId = requireInt(req.body.topicId, 'topicId', { min: 1 })
  if (!topicId.ok) {
    return res.status(400).json({ message: topicId.message })
  }

  const parentCommentId = requireInt(
    req.body.parentCommentId,
    'parentCommentId',
    {
      min: 1,
    }
  )
  if (!parentCommentId.ok) {
    return res.status(400).json({ message: parentCommentId.message })
  }

  try {
    const reply = await Comment.create({
      content: content.value,
      userId: req.user.id,
      topicId: topicId.value,
      parentCommentId: parentCommentId.value,
    })
    return res.status(201).json(reply)
  } catch (error) {
    console.error('Failed to create reply', error)
    const message =
      error instanceof Error ? error.message : 'Failed to create reply'
    return res.status(500).json({ message })
  }
}

export const createReplyHandler = async (
  req: Request,
  res: Response
): Promise<Response> => {
  try {
    return await createReply(req, res)
  } catch (error) {
    console.error('Unexpected error in createReplyHandler', error)
    return res.status(500).json({ message: 'Failed to create reply' })
  }
}
