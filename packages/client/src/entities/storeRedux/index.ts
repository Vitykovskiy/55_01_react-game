import { configureStore } from '@reduxjs/toolkit'
import { leaderboardSlice } from './leaderboard'
import { userSlice } from '@entities/user'
import {
  TypedUseSelectorHook,
  useDispatch as useDispatchBase,
  useSelector as useSelectorBase,
} from 'react-redux'

export type StoreDataRootState = ReturnType<typeof storeData.getState>
export type StoreDataAppDispatch = typeof storeData.dispatch

export const storeData = configureStore({
  reducer: {
    leaderboardSlice: leaderboardSlice.reducer,
    userSlice: userSlice.reducer,
  },
})

// export const selectUser = (state: StoreDataRootState) => {
//   if (!state.userSlice) {
//     return null
//   }

//   return state.userSlice?.data || null
// }
// export const selectUserLoad = (state: StoreDataRootState) => {
//   if (!state.userSlice) {
//     return false
//   }

//   return state.userSlice?.isLoadingUser
// }

export const useDispatch = () => useDispatchBase<StoreDataAppDispatch>()
export const useSelectorStore: TypedUseSelectorHook<StoreDataRootState> =
  useSelectorBase
