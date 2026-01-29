import { createTopicRequest, getTopicsRequest } from '../api'
import { CreateTopicPayload } from '../api/types'
import { ForumTopic } from '../model/types'
import { mapTopicDtoToForumTopic } from './mappers'

export async function getTopics(): Promise<ForumTopic[]> {
  try {
    const response = await getTopicsRequest()
    return response.map(mapTopicDtoToForumTopic)
  } catch (error) {
    console.error('Ошибка загрузки топиков', error)
    return []
  }
}

export async function createTopic(
  data: CreateTopicPayload
): Promise<ForumTopic | null> {
  try {
    const response = await createTopicRequest(data)
    return mapTopicDtoToForumTopic(response)
  } catch (error) {
    console.error('Ошибка создания топика', error)
    return null
  }
}
