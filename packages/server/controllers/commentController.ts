import { Request, Response } from 'express'
import { Comment } from '../models'
import { optionalInt, requireInt, requireText } from '../utils/validation'

const COMMENT_MAX_LENGTH = 5000

export const getCommentsByTopic = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const topicId = requireInt(req.params.topicId, 'topicId', { min: 1 })
  if (!topicId.ok) {
    return res.status(400).json({ message: topicId.message })
  }

  const limitParam = optionalInt(req.query.limit, 'limit', { min: 1, max: 100 })
  if (!limitParam.ok) {
    return res.status(400).json({ message: limitParam.message })
  }

  const offsetParam = optionalInt(req.query.offset, 'offset', { min: 0 })
  if (!offsetParam.ok) {
    return res.status(400).json({ message: offsetParam.message })
  }

  const limit = limitParam.value ?? 50
  const offset = offsetParam.value ?? 0

  try {
    const comments = await Comment.findAll({
      where: { topicId: topicId.value },
      order: [
        ['parentCommentId', 'ASC'],
        ['createdAt', 'ASC'],
      ],
      limit,
      offset,
    })
    return res.json(comments)
  } catch (error) {
    console.error('Failed to fetch comments', error)
    return res.status(500).json({ message: 'Failed to fetch comments' })
  }
}

const createCommentRecord = async (
  req: Request,
  res: Response,
  options: {
    parentRequired: boolean
    logLabel: string
    failureMessage: string
  }
): Promise<Response> => {
  const body = typeof req.body === 'object' && req.body !== null ? req.body : {}
  const content = requireText(
    (body as { content?: unknown }).content,
    'content',
    {
      maxLength: COMMENT_MAX_LENGTH,
    }
  )
  if (!content.ok) {
    return res.status(400).json({ message: content.message })
  }

  const topicIdFromParams = req.params.topicId
    ? requireInt(req.params.topicId, 'topicId', { min: 1 })
    : null
  if (topicIdFromParams && !topicIdFromParams.ok) {
    return res.status(400).json({ message: topicIdFromParams.message })
  }

  const topicIdFromBody = requireInt(
    (body as { topicId?: unknown }).topicId,
    'topicId',
    { min: 1 }
  )
  if (!topicIdFromBody.ok) {
    return res.status(400).json({ message: topicIdFromBody.message })
  }

  if (topicIdFromParams && topicIdFromBody.value !== topicIdFromParams.value) {
    return res.status(400).json({ message: 'topicId does not match route' })
  }

  const topicId = topicIdFromParams?.value ?? topicIdFromBody.value

  const parentCommentId = options.parentRequired
    ? requireInt(
        (body as { parentCommentId?: unknown }).parentCommentId,
        'parentCommentId',
        { min: 1 }
      )
    : optionalInt(
        (body as { parentCommentId?: unknown }).parentCommentId,
        'parentCommentId',
        { min: 1 }
      )
  if (!parentCommentId.ok) {
    return res.status(400).json({ message: parentCommentId.message })
  }

  if (parentCommentId.value !== null) {
    const parent = await Comment.findByPk(parentCommentId.value)
    if (!parent || parent.topicId !== topicId) {
      return res
        .status(400)
        .json({ message: 'parentCommentId does not belong to topic' })
    }
  }

  try {
    const userId = req.user!.id
    const comment = await Comment.create({
      content: content.value,
      userId,
      topicId,
      parentCommentId: parentCommentId.value,
    })
    return res.status(201).json(comment)
  } catch (error) {
    console.error(options.logLabel, error)
    return res.status(500).json({ message: options.failureMessage })
  }
}

export const createComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  return createCommentRecord(req, res, {
    parentRequired: false,
    logLabel: 'Failed to create comment',
    failureMessage: 'Failed to create comment',
  })
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
    const parent = await Comment.findByPk(commentId.value)
    if (!parent) {
      return res.status(404).json({ message: 'Comment not found' })
    }

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
  return createCommentRecord(req, res, {
    parentRequired: true,
    logLabel: 'Failed to create reply',
    failureMessage: 'Failed to create reply',
  })
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
