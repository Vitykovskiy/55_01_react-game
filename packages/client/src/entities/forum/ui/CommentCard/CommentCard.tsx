import { Avatar, Card, Text, Button } from '@gravity-ui/uikit'
import s from './style.module.scss'
import Section from '@shared/ui/Section'
import { ForumTopicComment, reactionEmojis } from '../../model/mockForumTopics'
import { useCommentReactions } from '../../lib/useCommentReactions'

export const CommentCard = ({
  id,
  firstName,
  lastName,
  avatarUrl,
  message,
}: ForumTopicComment) => {
  const commentId = parseInt(id.replace('c-', ''))
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
