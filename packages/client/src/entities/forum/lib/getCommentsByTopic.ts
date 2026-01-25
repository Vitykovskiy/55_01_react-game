import { getCommentsByTopicRequest } from '../api'
import { ForumTopicComment } from '../model/types'
import { commentDtoToView } from './mappers'

export async function getCommentsByTopic(
  topicId: number
): Promise<ForumTopicComment[]> {
  try {
    const response = (await getCommentsByTopicRequest(topicId)) ?? []

    return response.map(dto => commentDtoToView(dto))
  } catch (err) {
    console.error('Ошибка получения списка топиков')
    return []
  }
}
