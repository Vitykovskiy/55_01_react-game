import { Request, Response } from 'express'
import { Comment, Reaction } from '../models'
import { requireInt } from '../utils/validation'

const REACTION_TYPES = [
  'like',
  'dislike',
  'laugh',
  'angry',
  'sad',
  'love',
] as const

type ReactionType = (typeof REACTION_TYPES)[number]

const isReactionType = (value: unknown): value is ReactionType =>
  typeof value === 'string' &&
  (REACTION_TYPES as readonly string[]).includes(value)

export const getReactionsByComment = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const commentId = requireInt(req.params.commentId, 'commentId', { min: 1 })
  if (!commentId.ok) {
    return res.status(400).json({ message: commentId.message })
  }

  try {
    const userId = req.user!.id
    const rows = (await Reaction.findAll({
      where: { commentId: commentId.value },
      attributes: ['type', 'userId'],
      raw: true,
    })) as unknown as { type: ReactionType; userId: number }[]

    const counts: Record<ReactionType, number> = {
      like: 0,
      dislike: 0,
      laugh: 0,
      angry: 0,
      sad: 0,
      love: 0,
    }

    const myReactionSet = new Set<ReactionType>()
    for (const row of rows) {
      counts[row.type] += 1
      if (row.userId === userId) {
        myReactionSet.add(row.type)
      }
    }

    const myReactions = Array.from(myReactionSet)

    return res.json({
      commentId: commentId.value,
      counts,
      myReactions,
    })
  } catch (error) {
    console.error('Failed to fetch reactions', error)
    return res.status(500).json({ message: 'Failed to fetch reactions' })
  }
}

export const createReaction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const commentId = requireInt(req.body.commentId, 'commentId', { min: 1 })
  if (!commentId.ok) {
    return res.status(400).json({ message: commentId.message })
  }

  const { type } = req.body
  if (!isReactionType(type)) {
    return res.status(400).json({ message: 'type is invalid' })
  }

  try {
    const userId = req.user!.id
    const [reaction, created] = await Reaction.findOrCreate({
      where: {
        commentId: commentId.value,
        userId,
        type,
      },
      defaults: {
        commentId: commentId.value,
        userId,
        type,
      },
    })

    return res.status(created ? 201 : 200).json({ reaction, created })
  } catch (error) {
    console.error('Failed to create reaction', error)
    const message =
      error instanceof Error ? error.message : 'Failed to create reaction'
    return res.status(500).json({ message })
  }
}

export const deleteReaction = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const commentId = requireInt(req.body.commentId, 'commentId', { min: 1 })
  if (!commentId.ok) {
    return res.status(400).json({ message: commentId.message })
  }

  const { type } = req.body
  if (!isReactionType(type)) {
    return res.status(400).json({ message: 'type is invalid' })
  }

  try {
    const userId = req.user!.id
    const comment = await Comment.findByPk(commentId.value)
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' })
    }

    const deleted = await Reaction.destroy({
      where: {
        commentId: commentId.value,
        userId,
        type,
      },
    })

    if (!deleted) {
      return res.status(404).json({ message: 'Reaction not found' })
    }

    return res.status(204).end()
  } catch (error) {
    console.error('Failed to delete reaction', error)
    return res.status(500).json({ message: 'Failed to delete reaction' })
  }
}
