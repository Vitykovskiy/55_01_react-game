import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { postLeaderboardList, postScore } from '../api'
import { LeaderboardDataUserGame } from './types'
import { FIELD_SORT, TEAM_NAME } from './consts'

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
  async (dataUserGame: LeaderboardDataUserGame) => {
    const dataRequest = {
      data: {
        id: dataUserGame.id,
        firstName: dataUserGame.firstName,
        lastName: dataUserGame.lastName,
        scoreUser: dataUserGame.scoreUser,
        avatar: dataUserGame.avatar,
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
      state.leaderboardList = []
      state.errorTopUserList = ''
      state.isLoadingTopUserList = false
      const responce = action.payload as { data: LeaderboardDataUserGame }[]
      responce.length > 0 &&
        responce.map(user => {
          state.leaderboardList.push(user.data)
        })
    })
  },
})

export const leaderboardReducer = leaderboardSlice.reducer
