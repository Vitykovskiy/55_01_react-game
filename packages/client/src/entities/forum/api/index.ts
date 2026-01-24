import { serverApi } from '@shared/lib'
import {
  TopicDto,
  CreateTopicPayload,
  CommentDto,
  CreateCommentPayload,
} from './types'

export const getTopics = (): Promise<TopicDto[] | undefined> => {
  return serverApi.getRequest<TopicDto[]>('topics')
}

export const createTopic = (
  data: CreateTopicPayload
): Promise<TopicDto | undefined> => {
  return serverApi.postRequest<TopicDto>('topics', data)
}

export const getCommentsByTopic = (
  topicId: number
): Promise<CommentDto[] | undefined> => {
  return serverApi.getRequest<CommentDto[]>(`comments/topic/${topicId}`)
}

export const createCommentForTopic = (
  topicId: number,
  data: Omit<CreateCommentPayload, 'topicId'>
): Promise<CommentDto | undefined> => {
  return serverApi.postRequest<CommentDto>(`comments/topic/${topicId}`, {
    ...data,
    topicId,
  })
}
