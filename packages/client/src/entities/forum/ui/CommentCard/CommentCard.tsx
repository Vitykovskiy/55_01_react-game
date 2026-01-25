import { Avatar, Card, Text, Button } from '@gravity-ui/uikit'
import s from './style.module.scss'
import Section from '@shared/ui/Section'
import { useState, useEffect } from 'react'
import { ForumTopicComment, reactionEmojis } from '../../model/mockForumTopics'
import {
  createReaction,
  deleteReaction,
  getReactionsByComment,
} from '@entities/forum/api'

export const CommentCard = ({
  id,
  firstName,
  lastName,
  avatarUrl,
  message,
}: ForumTopicComment) => {
  const [reactions, setReactions] = useState<{
    counts: Record<string, number>
    myReactions: string[]
  }>({
    counts: {},
    myReactions: [],
  })

  const fullName = `${firstName} ${lastName}`
  const commentId = parseInt(id.replace('c-', ''))

  useEffect(() => {
    loadReactions()
  }, [commentId])

  const loadReactions = async () => {
    try {
      const data = await getReactionsByComment(commentId)
      if (!data) return
      setReactions({
        counts: data.counts,
        myReactions: data.myReactions,
      })
    } catch (error) {
      console.error('Failed to load reactions:', error)
    }
  }

  const isReactionActive = (emojiName: string) => {
    return reactions.myReactions.includes(emojiName)
  }

  const handleReactionClick = async (emojiName: string) => {
    try {
      const isActive = isReactionActive(emojiName)

      if (isActive) {
        await deleteReaction({
          commentId,
          type: emojiName,
        })
      } else {
        await createReaction({
          commentId,
          type: emojiName,
        })
      }

      const currentCount = reactions.counts[emojiName] || 0
      setReactions(prev => {
        const newCounts = { ...prev.counts }
        const newMyReactions = [...prev.myReactions]

        if (isActive) {
          newCounts[emojiName] = Math.max(0, currentCount - 1)
          const index = newMyReactions.indexOf(emojiName)
          if (index > -1) {
            newMyReactions.splice(index, 1)
          }
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
  }

  return (
    <Card className={s.commentCard}>
      <Section>
        <Section orientation="row" alignItems="center">
          <Avatar
            imgUrl={avatarUrl}
            size="m"
            className={s.avatar}
            alt={firstName}
            withImageBorder
            text={fullName}
          />
          <Section>
            <Text as="h2" variant="subheader-2">
              {fullName}
            </Text>
          </Section>
        </Section>

        <Section>
          <Text as="p" variant="body-2">
            {message}
          </Text>
        </Section>

        <Section orientation="row" alignItems="center">
          {reactionEmojis.map(emoji => (
            <Button
              key={emoji.name}
              view={isReactionActive(emoji.name) ? 'action' : 'outlined'}
              size="s"
              onClick={() => handleReactionClick(emoji.name)}>
              <span style={{ marginRight: 4 }}>{emoji.icon}</span>
              <Text variant="caption-1">
                {reactions.counts[emoji.name] || 0}
              </Text>
            </Button>
          ))}
        </Section>
      </Section>
    </Card>
  )
}
