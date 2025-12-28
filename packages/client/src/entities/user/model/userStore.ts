import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './types'
import { getUser } from '../api'
import { ApiResponse } from '@shared/lib'

interface UserState {
  data: User | null
  isLoadingUser: boolean
  isError: boolean
}

const initialState: UserState = {
  data: null,
  isLoadingUser: false,
  isError: false,
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
    },
  },

  extraReducers: builder => {
    builder.addCase(getUserData.pending, state => {
      state.isLoadingUser = true
    })
    builder.addCase(getUserData.rejected, state => {
      state.isLoadingUser = false
      state.isError = true
    })
    builder.addCase(getUserData.fulfilled, (state, action) => {
      if (action.payload.type === 'ERROR') {
        state.isError = true
      } else {
        state.isError = false
        state.data = action.payload.data as User | null
      }
      state.isLoadingUser = false
    })
  },
})

export const { setUser } = userSlice.actions

export const userReducer = userSlice.reducer
