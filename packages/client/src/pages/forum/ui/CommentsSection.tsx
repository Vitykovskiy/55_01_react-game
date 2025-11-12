import { Text } from '@gravity-ui/uikit'
import { CommentCard, ForumTopicComment } from '@entities/forum'
import Section from '@shared/ui/Section'

type CommentsSectionProps = {
  comments: ForumTopicComment[]
}

export const CommentsSection = ({ comments }: CommentsSectionProps) => {
  if (!comments.length) {
    return (
      <Section>
        <Text as="h2" variant="subheader-2">
          Комментарии:
        </Text>
        <Text as="p" variant="body-2">
          Будь первым, кто оставит комментарий.
        </Text>
      </Section>
    )
  }

  return (
    <Section>
      <Text as="h2" variant="subheader-2">
        Комментарии:
      </Text>
      {comments.map(comment => (
        <CommentCard key={comment.id} {...comment} />
      ))}
    </Section>
  )
}
