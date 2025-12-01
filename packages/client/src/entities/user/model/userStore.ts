import { configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './types'

export type UserRootState = ReturnType<typeof userStore.getState>
export type UserAppDispatch = typeof userStore.dispatch

interface UserState {
  data: User | null
  error: string | null
}

const initialState: UserState = {
  data: null,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.data = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
    clearError: state => {
      state.error = null
    },
  },
})

export const userStore = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
})

export const selectUser = (state: UserRootState) => {
  if (!state.user) {
    return null
  }

  return state.user.data
}

export const useDispatch = () => useDispatchBase<UserAppDispatch>()
export const useSelector: TypedUseSelectorHook<UserRootState> = useSelectorBase

export const { setUser, setError, clearError } = userSlice.actions
