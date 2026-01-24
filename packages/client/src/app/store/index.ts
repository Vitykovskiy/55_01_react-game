import { forumTopicsReducer } from '@entities/forum'
import { leaderboardReducer } from '@entities/leaderboard'
import { userReducer } from '@entities/user'
import { configureStore } from '@reduxjs/toolkit'
import { ssrReducer } from '@shared/config'
import { combineReducers } from 'redux'

// Глобально декларируем в window наш ключик
// и задаем ему тип такой же как у стейта в сторе
export const reducer = combineReducers({
  ssr: ssrReducer,
  user: userReducer,
  leaderboard: leaderboardReducer,
  forumTopics: forumTopicsReducer,
})

export const store = configureStore({
  reducer,
  preloadedState:
    typeof window === 'undefined' ? undefined : window.APP_INITIAL_STATE,
})

declare global {
  interface Window {
    APP_INITIAL_STATE: RootState
  }
  type RootState = ReturnType<typeof reducer>
  type AppDispatch = typeof store.dispatch
  type StoreBase = typeof store
}
