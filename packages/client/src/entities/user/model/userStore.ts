import { configureStore } from '@reduxjs/toolkit'
import {
  TypedUseSelectorHook,
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { User } from './types'

interface UserState {
  data: User | null
  isLoading: boolean
  error: string | null
}

const initialState: UserState = {
  data: null,
  isLoading: false,
  error: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserSuccess: (state, action: PayloadAction<User>) => {
      state.data = action.payload
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})

export const userStore = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
})

export type UserRootState = ReturnType<typeof userStore.getState>
export type UserAppDispatch = typeof userStore.dispatch

export const selectUser = (state: UserRootState) => {
  if (!state.user) {
    return null
  }
  return state.user.data
}

export const useDispatch = () => useDispatchBase<UserAppDispatch>()
export const useSelector: TypedUseSelectorHook<UserRootState> = useSelectorBase

export const { setUserSuccess, setLoading, setError } = userSlice.actions
