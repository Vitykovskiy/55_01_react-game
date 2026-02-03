export type LeaderboardDataUserGame = {
  id: number
  firstName: string
  lastName: string
  scoreUser: number
  avatar?: string
}

export type LeaderboardDto = {
  data: {
    id: number
    firstName: string
    lastName: string
    scoreUser: number
    avatar?: string
  }
}

export type LeaderboardDataUserGameDto = LeaderboardDto & {
  ratingFieldName: string
  teamName: string
}
