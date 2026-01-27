import { useState, useEffect, useCallback } from 'react'
import { createReaction, deleteReaction, getReactionsByComment } from '../api'

export const useCommentReactions = (commentId: number) => {
  const [reactions, setReactions] = useState<{
    counts: Record<string, number>
    myReactions: string[]
  }>({
    counts: {},
    myReactions: [],
  })

  useEffect(() => {
    const loadReactions = async () => {
      try {
        const data = await getReactionsByComment(commentId)
        if (data) {
          setReactions({
            counts: data.counts,
            myReactions: data.myReactions,
          })
        }
      } catch (error) {
        console.error('Failed to load reactions:', error)
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
          await deleteReaction({ commentId, type: emojiName })
        } else {
          await createReaction({ commentId, type: emojiName })
        }

        setReactions(prev => {
          const newCounts = { ...prev.counts }
          const newMyReactions = [...prev.myReactions]
          const currentCount = newCounts[emojiName] || 0

          if (isActive) {
            newCounts[emojiName] = Math.max(0, currentCount - 1)
            const index = newMyReactions.indexOf(emojiName)
            if (index > -1) newMyReactions.splice(index, 1)
          } else {
            newCounts[emojiName] = currentCount + 1
            newMyReactions.push(emojiName)
          }

          return {
            counts: newCounts,
            myReactions: newMyReactions,
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
