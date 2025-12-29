import { LeaderboardDataUserGame, LeaderboardDto } from '../model/types'
import { Api } from '@shared/lib'
import {
  FIELD_SORT,
  LIMIT_LIST_TOP_USER,
  PAGINATION_CURSOR,
  TEAM_NAME,
} from '../model/consts'

type PostScoreParams = {
  data: LeaderboardDataUserGame
  ratingFieldName: string
  teamName: string
}

export const postScore = (data: PostScoreParams): Promise<void> =>
  Api.postRequest<void>('/leaderboard', data)

export const postLeaderboardList = (): Promise<LeaderboardDto[] | undefined> =>
  Api.postRequest<LeaderboardDto[] | undefined>(`/leaderboard/${TEAM_NAME}`, {
    ratingFieldName: FIELD_SORT,
    cursor: PAGINATION_CURSOR,
    limit: LIMIT_LIST_TOP_USER,
  })
