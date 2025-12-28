import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postLeaderboardList, postScore } from '../api'
import { LeaderboardDataUserGame, LeaderboardDataUserGameDto } from './types'
// import { FIELD_SORT, TEAM_NAME } from './consts'
import {
  mapUserToDtoLeaderboard,
  mapUserToDtoLeaderboardList,
} from '../lib/mappers'

type LeaderboardInitialState = {
  leaderboardList: LeaderboardDataUserGame[]
  firstName: string
  lastName: string
  scoreUser: number
  isLoadingPostUserScore: boolean
  errorPostUserScore: string
  isLoadingTopUserList: boolean
  errorTopUserList: string
}

const initialState: LeaderboardInitialState = {
  leaderboardList: [],
  firstName: '',
  lastName: '',
  scoreUser: 0,
  isLoadingPostUserScore: false,
  errorPostUserScore: '',
  isLoadingTopUserList: false,
  errorTopUserList: '',
}

export const postResultGameUser = createAsyncThunk(
  'leaderboard/postResultGameUser',
  async (dataUserGame: LeaderboardDataUserGame): Promise<void> => {
    const dataRequest: LeaderboardDataUserGameDto =
      mapUserToDtoLeaderboard(dataUserGame)

    return await postScore(dataRequest)
  }
)

export const getTopUserList = createAsyncThunk(
  'leaderboard/getTopUserList',
  async (): Promise<LeaderboardDataUserGame[]> => {
    const response = await postLeaderboardList()

    if (response) {
      return mapUserToDtoLeaderboardList(response)
    }

    return []
  }
)

const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(postResultGameUser.pending, state => {
      state.isLoadingPostUserScore = true
      state.errorPostUserScore = ''
    })
    builder.addCase(postResultGameUser.rejected, state => {
      state.isLoadingPostUserScore = false
      state.errorPostUserScore = 'Ошибка отправки результатов!'
    })
    builder.addCase(postResultGameUser.fulfilled, state => {
      state.isLoadingPostUserScore = false
      state.errorPostUserScore = ''
    })

    builder.addCase(getTopUserList.pending, state => {
      state.errorTopUserList = ''
      state.isLoadingTopUserList = true
    })
    builder.addCase(getTopUserList.rejected, state => {
      state.isLoadingTopUserList = false
      state.errorTopUserList = 'Ошибка загрузки!'
    })
    builder.addCase(getTopUserList.fulfilled, (state, action) => {
      state.errorTopUserList = ''
      state.isLoadingTopUserList = false
      state.leaderboardList = action.payload
    })
  },
})

export const leaderboardReducer = leaderboardSlice.reducer
