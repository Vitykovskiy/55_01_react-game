import { ResponseType } from '@shared/lib'
import { getReactions } from '@entities/forum/lib/getReactions'
import { Reaction } from './types'

export const useReactions = () => {
  const getReactionsComment = async (
    commentId: number
  ): Promise<Reaction | undefined> => {
    const response = await getReactions(commentId)
    if (response.type === ResponseType.Success) {
      return response.data
    }
  }

  return {
    getReactionsComment,
  }
}
