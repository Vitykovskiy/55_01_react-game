import { useState, useEffect, useCallback } from 'react'
import { createReaction, deleteReaction } from '../api'
import { useReactions } from './useReactions'
import { ReactionsState } from './types'
import {
  mapReactionResponseToState,
  mapToCreateReactionRequest,
  mapToDeleteReactionRequest,
} from '../lib/mappers'
export const useCommentReactions = (commentId: number) => {
  const { getReactionsComment } = useReactions()
  const [reactions, setReactions] = useState<ReactionsState>({
    counts: {},
    myReactions: [],
  })

  useEffect(() => {
    const loadReactions = async () => {
      const dto = await getReactionsComment(commentId)
      if (dto) {
        setReactions(mapReactionResponseToState(dto))
      }
    }

    loadReactions()
  }, [commentId])

  const isReactionActive = useCallback(
    (emojiName: string) => reactions.myReactions.includes(emojiName),
    [reactions.myReactions]
  )

  const handleReactionClick = useCallback(
    async (emojiName: string) => {
      try {
        const isActive = isReactionActive(emojiName)

        if (isActive) {
          const requestDto = mapToDeleteReactionRequest(commentId, emojiName)
          await deleteReaction(requestDto)
        } else {
          const requestDto = mapToCreateReactionRequest(commentId, emojiName)
          await createReaction(requestDto)
        }

        setReactions(prev => {
          const currentCount = prev.counts[emojiName] || 0

          if (isActive) {
            return {
              counts: {
                ...prev.counts,
                [emojiName]: Math.max(0, currentCount - 1),
              },
              myReactions: prev.myReactions.filter(r => r !== emojiName),
            }
          } else {
            return {
              counts: {
                ...prev.counts,
                [emojiName]: currentCount + 1,
              },
              myReactions: [...prev.myReactions, emojiName],
            }
          }
        })
      } catch (error) {
        console.error('Failed to toggle reaction:', error)
      }
    },
    [commentId, isReactionActive]
  )

  return {
    reactions,
    isReactionActive,
    handleReactionClick,
  }
}
