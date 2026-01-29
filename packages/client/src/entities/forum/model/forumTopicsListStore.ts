import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ForumTopic, ForumTopicsListState } from './types'
import { getTopics } from '../lib/forumTopic'

const initialState: ForumTopicsListState = {
  topics: [],
  isLoading: false,
  error: '',
}

export const fetchForumTopics = createAsyncThunk(
  'forum/fetchTopics',
  async (): Promise<ForumTopic[]> => {
    return getTopics()
  }
)

const forumTopicsListSlice = createSlice({
  name: 'forumTopicsList',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchForumTopics.pending, state => {
      state.isLoading = true
      state.error = ''
    })
    builder.addCase(fetchForumTopics.rejected, state => {
      state.isLoading = false
      state.error = 'Ошибка загрузки тем!'
    })
    builder.addCase(fetchForumTopics.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = ''
      state.topics = action.payload
    })
  },
})

export const forumTopicsListReducer = forumTopicsListSlice.reducer
