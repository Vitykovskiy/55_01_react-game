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
    logout: state => {
      state.data = null
      state.error = null
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.data) {
        state.data = { ...state.data, ...action.payload }
      }
    },
  },
})

export const userStore = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
})

export const { setUserSuccess, setLoading, setError, logout, updateUser } =
  userSlice.actions

export const selectUser = (state: { user: UserState }) => state.user.data
export const selectUserLoading = (state: UserRootState) => state.user.isLoading
export const selectUserError = (state: UserRootState) => state.user.error
export const selectIsAuthenticated = (state: UserRootState) => !!state.user.data

export type UserRootState = ReturnType<typeof userStore.getState>
export type UserAppDispatch = typeof userStore.dispatch

export const useDispatch: () => UserAppDispatch = useDispatchBase
export const useSelector: TypedUseSelectorHook<UserRootState> = useSelectorBase
