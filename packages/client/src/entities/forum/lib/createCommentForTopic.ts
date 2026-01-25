import { createCommentForTopicRequest } from '../api'
import { ForumTopicComment } from '../model/types'
import { commentDtoToView } from './mappers'

export async function createCommentForTopic(
  topicId: number,
  text: string,
  parentCommentId = null
): Promise<ForumTopicComment | undefined> {
  try {
    const response = await createCommentForTopicRequest(topicId, {
      content: text.trim(),
      parentCommentId,
    })
    if (!response) {
      throw new Error('Сервер вернул пустой ответ')
    }
    return commentDtoToView(response)
  } catch (err) {
    console.error('Ошибка создания комментария', err)
  }
}
