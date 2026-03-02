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

export const mapReactionResponseToState = (reaction: ReactionDto): ReactionsState => ({
  counts: reaction.counts,
  reactions: reaction.myReactions,
})

export const mapToCreateReactionRequest = (deleteReaction: DeleteReactionDto): DeleteReaction => ({
  commentId: deleteReaction.commentId,
  type: deleteReaction.type,
})

export const mapToDeleteReactionRequest = (createReaction: CreateReactionDto): CreateReaction => ({
  commentId: createReaction.commentId,
  type: createReaction.type,
})

export const mapReactionDtoToReaction = (reaction: ReactionDto): Reaction => ({
  commentId: reaction.commentId,
  counts: reaction.counts,
  myReactions: reaction.myReactions,
})
