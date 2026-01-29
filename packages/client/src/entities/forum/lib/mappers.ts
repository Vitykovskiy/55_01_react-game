import { CommentDto, TopicDto } from '../api/types'
import { ForumTopic, ForumTopicComment } from '../model/types'

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
