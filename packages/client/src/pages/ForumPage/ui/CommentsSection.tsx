import { Text } from '@gravity-ui/uikit'
import { CommentCard, ForumTopicCommentDto } from '@entities/forum'
import Section from '@shared/ui/Section'

type CommentsSectionProps = {
  comments: ForumTopicCommentDto[]
}

export const CommentsSection = ({ comments }: CommentsSectionProps) => (
  <Section>
    <Text as="h2" variant="subheader-2">
      Комментарии:
    </Text>
    {!comments.length ? (
      <Text as="p" variant="body-2">
        Будь первым, кто оставит комментарий.
      </Text>
    ) : (
      comments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))
    )}
  </Section>
)
