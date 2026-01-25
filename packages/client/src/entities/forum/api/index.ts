import { serverApi } from '@shared/lib'
import {
  TopicDto,
  CreateTopicPayload,
  CommentDto,
  CreateCommentPayload,
} from './types'

export const getTopicsRequest = (): Promise<TopicDto[] | undefined> => {
  return serverApi.getRequest<TopicDto[]>('topics')
}

export const createTopicRequest = (
  data: CreateTopicPayload
): Promise<TopicDto | undefined> => {
  return serverApi.postRequest<TopicDto>('topics', data)
}

export const getCommentsByTopicRequest = (
  topicId: number
): Promise<CommentDto[] | undefined> => {
  return serverApi.getRequest<CommentDto[]>(`comments/topic/${topicId}`)
}

export const createCommentForTopicRequest = (
  topicId: number,
  data: Omit<CreateCommentPayload, 'topicId'>
): Promise<CommentDto | undefined> => {
  return serverApi.postRequest<CommentDto>(`comments/topic/${topicId}`, {
    ...data,
    topicId,
  })
}
