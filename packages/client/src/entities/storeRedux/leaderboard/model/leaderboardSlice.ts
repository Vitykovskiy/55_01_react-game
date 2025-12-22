import { createAsyncThunk } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { postLeaderboardList, postScore } from './api'
import { LeaderboardDataUserGame } from './types'
import { FIELD_SORT, TEAM_NAME } from './consts'

type LeaderboardInitialState = {
  leaderboardList: []
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
  async (dataUserGame: LeaderboardDataUserGame) => {
    const dataRequest = {
      data: {
        id: dataUserGame.id,
        firstName: dataUserGame.firstName,
        lastName: dataUserGame.lastName,
        [FIELD_SORT]: dataUserGame.scoreUser,
      },
      ratingFieldName: FIELD_SORT,
      teamName: TEAM_NAME,
    }
    const response = await postScore(dataRequest)
    return response
  }
)

export const getTopUserList = createAsyncThunk(
  'leaderboard/getTopUserList',
  async () => {
    const response = await postLeaderboardList()
    return response
  }
)

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState,
  reducers: {
    setLeaderboardScoreUser: (state, action) => {
      state.scoreUser = action.payload
    },
  },
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
      state.leaderboardList = action.payload as []
    })
  },
})

export const { setLeaderboardScoreUser } = leaderboardSlice.actions
