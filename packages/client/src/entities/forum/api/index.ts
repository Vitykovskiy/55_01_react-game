import { Api } from '@shared/lib'
import {
  CreateReactionRequest,
  CreateReactionResponse,
  DeleteReactionRequest,
  ReactionResponse,
} from '@entities/forum/model/mockForumTopics'

export const getReactionsByComment = (
  commentId: number
): Promise<ReactionResponse | undefined> =>
  Api.getRequest<ReactionResponse>(`/reactions/comment/${commentId}`)

export const createReaction = (
  data: CreateReactionRequest
): Promise<CreateReactionResponse | undefined> =>
  Api.postRequest<CreateReactionResponse>('/reactions', data)

export const deleteReaction = (data: DeleteReactionRequest): Promise<void> =>
  Api.deleteRequest<void>('/reactions', { data })
