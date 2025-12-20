import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './types'
import { getUser } from '@pages/ProfilePage/lib/getUser'

interface UserState {
  data: User | Record<string, undefined> | null
  isLoadingUser: boolean
  // isError: boolean
}

const initialState: UserState = {
  data: null,
  isLoadingUser: false,
  // isError: false
}

export const getUserData = createAsyncThunk('user/getUserData', async () => {
  const response = await getUser()
  return response
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload
    },
  },
  extraReducers: builder => {
    // запрос данных пользователя
    builder.addCase(getUserData.pending, state => {
      state.isLoadingUser = true
    })
    builder.addCase(getUserData.fulfilled, (state, action) => {
      // action.payload.type === 'ERROR' ? state.isError = true : state.isError = false
      state.isLoadingUser = false
      state.data = action.payload.data as
        | User
        | Record<string, undefined>
        | null
    })
  },
})

export const { setUser } = userSlice.actions
