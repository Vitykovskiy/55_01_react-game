import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ApiResponse, ResponseType } from '@shared/lib'

import { getUser } from '../lib/getUser'
import { User } from './types'

interface UserState {
  data?: User
  isLoadingUser: boolean
  isAuthenticated: boolean
}

const initialState: UserState = {
  data: undefined,
  isLoadingUser: true,
  isAuthenticated: false,
}

export const getUserData = createAsyncThunk(
  'user/getUserData',
  async (): Promise<ApiResponse<User>> => {
    return await getUser()
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload
      state.isAuthenticated = true
    },
    clearUser: state => {
      state.data = undefined
      state.isAuthenticated = false
      state.isLoadingUser = false
    },
  },

  extraReducers: builder => {
    builder.addCase(getUserData.pending, state => {
      state.isLoadingUser = true
    })
    builder.addCase(getUserData.fulfilled, (state, action) => {
      state.isLoadingUser = false

      if (action.payload.type === ResponseType.Error) {
        state.isAuthenticated = false
        state.data = undefined
        return
      }

      state.data = action.payload.data
      state.isAuthenticated = true
    })
  },
})

export const selectUser = (state: RootState) => state.user.data

export const { setUser, clearUser } = userSlice.actions

export const userReducer = userSlice.reducer
