import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ForumErrorCode, ForumTopic, ForumTopicsListState } from './types'
import { getTopics } from '../lib/forumTopic'

const initialState: ForumTopicsListState = {
  topics: [],
  isLoading: false,
  error: null,
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
      state.error = null
    })
    builder.addCase(fetchForumTopics.rejected, state => {
      state.isLoading = false
      state.error = {
        message: 'Ошибка загрузки тем!',
        code: ForumErrorCode.TopicsFetch,
      }
    })
    builder.addCase(fetchForumTopics.fulfilled, (state, action) => {
      state.isLoading = false
      state.error = null
      state.topics = action.payload
    })
  },
})

export const forumTopicsListReducer = forumTopicsListSlice.reducer
