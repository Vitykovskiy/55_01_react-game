import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from '@pages/ProfilePage/model/types'

interface UserState {
  user: User | null
  isLoading: boolean
  error: string | null
}

const initialState: UserState = {
  user: null,
  isLoading: false,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    logout: state => {
      state.user = null
      state.error = null
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload }
      }
    },
  },
})

export const { setUser, setLoading, setError, logout, updateUser } =
  userSlice.actions

export const userReducer = userSlice.reducer

export const selectUser = (state: { user: UserState }) => state.user.user
export const selectUserLoading = (state: { user: UserState }) =>
  state.user.isLoading
export const selectUserError = (state: { user: UserState }) => state.user.error
