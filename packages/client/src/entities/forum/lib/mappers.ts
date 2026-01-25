import { CommentDto } from '../api/types'
import { ForumTopicComment } from '../model/types'

export const commentDtoToView = (comment: CommentDto): ForumTopicComment => ({
  id: comment.id,
  firstName: 'Пользователь',
  lastName: String(comment.userId),
  avatarUrl: '',
  message: comment.content,
})
