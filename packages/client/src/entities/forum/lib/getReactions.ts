import { serverApi, ApiResponse, CommonErrorType } from '@shared/lib'
import { getReactionsByComment } from '../api'
import { Reaction } from '../model/types'

export const getReactions = async (
  commentId: number
): Promise<ApiResponse<Reaction>> => {
  try {
    const reactions = await getReactionsByComment(commentId)
    if (!reactions) {
      return serverApi.buildResponseError(CommonErrorType.UnknownError)
    }

    return serverApi.buildResponseSuccess(reactions)
  } catch (error) {
    return serverApi.handleError(error)
  }
}
