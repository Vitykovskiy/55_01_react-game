import { LeaderboardDataUserGame } from '@entities/storeRedux/leaderboard/model/types'
import { Api } from '../../../../shared/lib/request'
import {
  FIELD_SORT,
  TEAM_NAME,
} from '@entities/storeRedux/leaderboard/model/consts'

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
    cursor: 0,
    limit: 10,
  })
