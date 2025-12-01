import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store/store'

export interface SsrState {
  pageHasBeenInitializedOnServer: boolean
}

const initialState: SsrState = {
  pageHasBeenInitializedOnServer: false,
}

export const ssrSlice = createSlice({
  name: 'ssr',
  initialState,
  reducers: {
    setPageHasBeenInitializedOnServer: (
      state,
      { payload }: PayloadAction<boolean>
    ) => {
      state.pageHasBeenInitializedOnServer = payload
    },
  },
})

export const selectPageHasBeenInitializedOnServer = (state: RootState) => {
  if (!state.ssr) {
    return false
  }
  return state.ssr.pageHasBeenInitializedOnServer
}

export const { setPageHasBeenInitializedOnServer } = ssrSlice.actions

export const ssrReducer = ssrSlice.reducer
