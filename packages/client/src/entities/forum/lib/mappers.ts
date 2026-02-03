import { CommentDto, TopicDto } from '../api/types'
import {
  ForumTopic,
  ForumTopicComment,
  ReactionDto,
  ReactionsState,
} from '../model/types'

export const commentDtoToView = (comment: CommentDto): ForumTopicComment => ({
  id: comment.id,
  firstName: 'Пользователь',
  lastName: String(comment.userId),
  avatarUrl: '',
  message: comment.content,
})

export const mapTopicDtoToForumTopic = (topic: TopicDto): ForumTopic => ({
  id: String(topic.id),
  title: topic.title,
  text: topic.content,
})

export const mapReactionResponseToState = (
  dto: ReactionDto
): ReactionsState => ({
  counts: dto.counts,
  myReactions: dto.myReactions,
})

export const mapToCreateReactionRequest = (
  commentId: number,
  emojiName: string
) => ({
  commentId,
  type: emojiName,
})

export const mapToDeleteReactionRequest = (
  commentId: number,
  emojiName: string
) => ({
  commentId,
  type: emojiName,
})

export const mapCommentDtoToApiFormat = (
  comment: ForumTopicComment
): {
  id: number
  commentDto: Omit<ForumTopicComment, 'id'> & { id: number }
} => {
  const match = comment.id.match(/^c-(\d+)$/)

  if (!match) {
    throw new Error(`Invalid comment ID format: ${comment.id}`)
  }

  const numericId = parseInt(match[1], 10)

  if (isNaN(numericId)) {
    throw new Error(`Invalid numeric ID in comment: ${comment.id}`)
  }

  return {
    id: numericId,
    commentDto: {
      ...comment,
      id: numericId,
    },
  }
}
