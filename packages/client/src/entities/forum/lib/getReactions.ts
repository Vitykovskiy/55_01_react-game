import { serverApi, ApiResponse, CommonErrorType } from '@shared/lib'
import { getReactionsByComment } from '../api'
import { Reaction } from '../model/types'
import { mapReactionDtoToReaction } from './mappers'

export const getReactions = async (
  commentId: number
): Promise<ApiResponse<Reaction>> => {
  try {
    const dto = await getReactionsByComment(commentId)
    if (!dto) {
      return serverApi.buildResponseError(CommonErrorType.UnknownError)
    }
    const reaction = mapReactionDtoToReaction(dto)
    return serverApi.buildResponseSuccess(reaction)
  } catch (error) {
    return serverApi.handleError(error)
  }
}
