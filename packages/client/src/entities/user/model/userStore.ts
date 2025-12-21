import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './types'

interface UserState {
  data: User | null
}

const initialState: UserState = {
  data: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload
    },
  },
})

export const selectUser = (state: RootState) => {
  if (!state.user) {
    return null
  }

  return state.user?.data || null
}

export const { setUser } = userSlice.actions

export const userReducer = userSlice.reducer
