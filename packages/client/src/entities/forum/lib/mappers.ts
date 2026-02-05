import {
  CommentDto,
  TopicDto,
  ReactionDto,
  DeleteReactionDto,
  CreateReactionDto,
} from '../api/types'
import {
  CreateReaction,
  DeleteReaction,
  ForumTopic,
  ForumTopicComment,
  Reaction,
  ReactionsState,
} from '../model/types'

export const commentDtoToView = (comment: CommentDto): ForumTopicComment => ({
  id: comment.id,
  // TODO: Убрать заглушки после мержа https://github.com/Vitykovskiy/55_01_react-game/issues/121
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
  dto: DeleteReactionDto
): DeleteReaction => ({
  commentId: dto.commentId,
  type: dto.type,
})

export const mapToDeleteReactionRequest = (
  dto: CreateReactionDto
): CreateReaction => ({
  commentId: dto.commentId,
  type: dto.type,
})

export const mapReactionDtoToReaction = (dto: ReactionDto): Reaction => ({
  commentId: dto.commentId,
  counts: dto.counts,
  myReactions: dto.myReactions,
})
