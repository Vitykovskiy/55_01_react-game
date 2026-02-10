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

  const loadReactions = async () => {
    const dto = await getReactionsComment(commentId)
    if (dto) {
      setReactions(mapReactionResponseToState(dto))
    }
  }

  useEffect(() => {
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
          const requestDto = mapToDeleteReactionRequest({commentId, type: emojiName})
          await deleteReaction(requestDto)
        } else {
          const requestDto = mapToCreateReactionRequest({commentId, type: emojiName})
          await createReaction(requestDto)
        }

        await loadReactions()

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
