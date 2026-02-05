import { Avatar, Card, Text, Button } from '@gravity-ui/uikit'
import s from './style.module.scss'
import Section from '@shared/ui/Section'
import { ForumTopicComment, ReactionEmoji } from '../../model/types'
import { useCommentReactions } from '../../model/useCommentReactions'
import { reactionEmojis } from '../../model/consts'
import { useCallback } from 'react'

type CommentCardProps = ForumTopicComment

export const CommentCard = ({
  id,
  firstName,
  lastName,
  avatarUrl,
  message,
}: CommentCardProps) => {
  if (!id) return

  const fullName = `${firstName} ${lastName}`

  const { reactions, isReactionActive, handleReactionClick } =
    useCommentReactions(id)

  const createReactionHandler = useCallback(
    (emojiName: string) => {
      return () => handleReactionClick(emojiName)
    },
    [handleReactionClick]
  )

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
          {reactionEmojis.map((emoji: ReactionEmoji) => (
            <Button
              key={emoji.name}
              view={isReactionActive(emoji.name) ? 'action' : 'outlined'}
              size="s"
              className={s.reactionButton}
              onClick={createReactionHandler(emoji.name)}>
              <span>{emoji.icon}</span>
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
