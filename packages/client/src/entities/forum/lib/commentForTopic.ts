import { createCommentForTopicRequest, getCommentsByTopicRequest } from '../api'
import { ForumTopicComment } from '../model/types'
import { commentDtoToView } from './mappers'

export async function createCommentForTopic(
  topicId: number,
  text: string,
  parentCommentId?: number
): Promise<ForumTopicComment | null> {
  try {
    const response = await createCommentForTopicRequest(topicId, {
      content: text.trim(),
      parentCommentId: parentCommentId ?? null,
    })

    return commentDtoToView(response)
  } catch (err) {
    console.error('Ошибка создания комментария', err)
    return null
  }
}

export async function getCommentsByTopic(
  topicId: number
): Promise<ForumTopicComment[]> {
  try {
    const response = await getCommentsByTopicRequest(topicId)
    return response.map(dto => commentDtoToView(dto))
  } catch (err) {
    console.error('Ошибка получения списка топиков')
    return []
  }
}
