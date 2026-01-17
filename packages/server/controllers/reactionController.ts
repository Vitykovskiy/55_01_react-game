import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { sequelize } from '../db'
import { Reaction } from '../models'
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

type ReactionCountRow = {
  type: ReactionType
  count: string
}

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

  if (!req.user?.id) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  try {
    const rows = (await Reaction.findAll({
      where: { commentId: commentId.value },
      attributes: [
        'type',
        [sequelize.fn('COUNT', sequelize.col('type')), 'count'],
      ],
      group: ['type'],
      raw: true,
    })) as unknown as ReactionCountRow[]

    const counts: Record<ReactionType, number> = {
      like: 0,
      dislike: 0,
      laugh: 0,
      angry: 0,
      sad: 0,
      love: 0,
    }

    for (const row of rows) {
      counts[row.type] = Number(row.count)
    }

    const myReactions = await Reaction.findAll({
      where: {
        commentId: commentId.value,
        userId: req.user.id,
        type: { [Op.in]: REACTION_TYPES as unknown as string[] },
      },
      attributes: ['type'],
      raw: true,
    }).then(result => result.map(r => r.type as ReactionType))

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

  if (!req.user?.id) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const { type } = req.body
  if (!isReactionType(type)) {
    return res.status(400).json({ message: 'type is invalid' })
  }

  try {
    const [reaction, created] = await Reaction.findOrCreate({
      where: {
        commentId: commentId.value,
        userId: req.user.id,
        type,
      },
      defaults: {
        commentId: commentId.value,
        userId: req.user.id,
        type,
      },
    })

    return res.status(created ? 201 : 200).json(reaction)
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

  if (!req.user?.id) {
    return res.status(403).json({ message: 'Forbidden' })
  }

  const { type } = req.body
  if (!isReactionType(type)) {
    return res.status(400).json({ message: 'type is invalid' })
  }

  try {
    const deleted = await Reaction.destroy({
      where: {
        commentId: commentId.value,
        userId: req.user.id,
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
