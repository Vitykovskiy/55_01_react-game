import { CommentDto } from '../api/types'
import { ForumTopicComment } from '../model/types'

export const commentDtoToView = (comment: CommentDto): ForumTopicComment => ({
  id: comment.id,
  // TODO: Убрать заглушки после мержа https://github.com/Vitykovskiy/55_01_react-game/issues/121
  firstName: 'Пользователь',
  lastName: String(comment.userId),
  avatarUrl: '',
  message: comment.content,
})
