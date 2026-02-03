import { serverApi } from '@shared/lib'
import {
  TopicDto,
  CreateTopicPayload,
  CommentDto,
  CreateCommentPayload,
  CreateReactionDto,
  ReactionDto,
  DeleteReactionDto,
} from './types'

export const getTopicsRequest = (): Promise<TopicDto[]> => {
  return serverApi.getRequest<TopicDto[]>('topics')
}

export const createTopicRequest = (
  data: CreateTopicPayload
): Promise<TopicDto> => {
  return serverApi.postRequest<TopicDto>('topics', data)
}

export const getCommentsByTopicRequest = (
  topicId: number
): Promise<CommentDto[]> => {
  return serverApi.getRequest<CommentDto[]>(`comments/topic/${topicId}`)
}

export const createCommentForTopicRequest = (
  topicId: number,
  data: Omit<CreateCommentPayload, 'topicId'>
): Promise<CommentDto> => {
  return serverApi.postRequest<CommentDto>(`comments/topic/${topicId}`, {
    ...data,
    topicId,
  })
}

export const getReactionsByComment = (
  commentId: number
): Promise<ReactionDto> => {
  return serverApi.getRequest<ReactionDto>(`reactions/comment/${commentId}`)
}

export const createReaction = (
  data: CreateReactionDto
): Promise<CreateReactionDto> => {
  return serverApi.postRequest<CreateReactionDto>('reactions', data)
}

export const deleteReaction = (data: DeleteReactionDto): Promise<void> => {
  return serverApi.deleteRequest<void>('reactions', { data })
}
