import { FIELD_SORT, TEAM_NAME } from '../model/consts'
import {
  LeaderboardDataUserGame,
  LeaderboardDataUserGameDto,
  LeaderboardDto,
} from '../model/types'

export const mapUserToDtoLeaderboardList = (
  dto: LeaderboardDto[]
): LeaderboardDataUserGame[] => {
  return dto.map(item => ({
    id: item.data.id,
    firstName: item.data.firstName,
    lastName: item.data.lastName,
    avatar: item.data.avatar,
    scoreUser: item.data.scoreUser,
  }))
}

export const mapUserToDtoLeaderboard = (
  dto: LeaderboardDataUserGame
): LeaderboardDataUserGameDto => ({
  data: {
    id: dto.id,
    firstName: dto.firstName,
    lastName: dto.lastName,
    scoreUser: dto.scoreUser,
    avatar: dto.avatar,
  },
  ratingFieldName: FIELD_SORT,
  teamName: TEAM_NAME,
})
