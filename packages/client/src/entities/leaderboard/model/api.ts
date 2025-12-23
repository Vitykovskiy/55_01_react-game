import { LeaderboardDataUserGame } from './types'
import { Api } from '@shared/lib'
import {
  FIELD_SORT,
  LIMIT_LIST_TOP_USER,
  PAGINATION_CURSOR,
  TEAM_NAME,
} from './consts'

type TypePostScore = {
  data: LeaderboardDataUserGame
  ratingFieldName: string
  teamName: string
}

export const postScore = (data: TypePostScore) =>
  Api.postRequest('https://ya-praktikum.tech/api/v2/leaderboard', data)

export const postLeaderboardList = () =>
  Api.postRequest(`https://ya-praktikum.tech/api/v2/leaderboard/${TEAM_NAME}`, {
    ratingFieldName: FIELD_SORT,
    cursor: PAGINATION_CURSOR,
    limit: LIMIT_LIST_TOP_USER,
  })
