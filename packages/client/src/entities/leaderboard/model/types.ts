export type LeaderboardDataUserGame = {
  id: number
  firstName: string
  lastName: string
  scoreUser: number
  avatar?: string | undefined
}

export type LeaderboardDto = {
  data: {
    id: number
    firstName: string
    lastName: string
    scoreUser: number
    avatar?: string | undefined
  }
}

export type LeaderboardDataUserGameDto = LeaderboardDto & {
  ratingFieldName: string
  teamName: string
}
