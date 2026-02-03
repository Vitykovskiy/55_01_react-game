import { Avatar, Card, Text, Button } from '@gravity-ui/uikit'
import s from './style.module.scss'
import Section from '@shared/ui/Section'
import { ForumTopicComment, ReactionEmoji } from '../../model/types'
import { useCommentReactions } from '../../model/useCommentReactions'
import { reactionEmojis } from '../../model/consts'
import { mapCommentDtoToApiFormat } from '../../lib/mappers'

interface CommentCardProps {
  comment: ForumTopicComment
}

export const CommentCard = ({ comment }: CommentCardProps) => {
  if (!comment) return
  const { id: commentId, commentDto } = mapCommentDtoToApiFormat(comment)
  const { firstName, lastName, avatarUrl, message } = commentDto

  const fullName = `${firstName} ${lastName}`

  const { reactions, isReactionActive, handleReactionClick } =
    useCommentReactions(commentId)

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
              onClick={() => handleReactionClick(emoji.name)}>
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
