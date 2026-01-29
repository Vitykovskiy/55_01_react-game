import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreateTopicPayload } from '../api/types'
import { ForumErrorCode, ForumTopicCreateState } from './types'
import { createTopic } from '../lib/forumTopic'
import { ForumTopic } from './types'

const initialState: ForumTopicCreateState = {
  isLoading: false,
  error: null,
}

export const createForumTopic = createAsyncThunk(
  'forum/createTopic',
  async (data: CreateTopicPayload): Promise<ForumTopic | null> => {
    return createTopic(data)
  }
)

const forumTopicCreateSlice = createSlice({
  name: 'forumTopicCreate',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(createForumTopic.pending, state => {
      state.isLoading = true
      state.error = null
    })
    builder.addCase(createForumTopic.rejected, state => {
      state.isLoading = false
      state.error = {
        message: 'Ошибка создания темы!',
        code: ForumErrorCode.TopicCreate,
      }
    })
    builder.addCase(createForumTopic.fulfilled, state => {
      state.isLoading = false
      state.error = null
    })
  },
})

export const forumTopicCreateReducer = forumTopicCreateSlice.reducer

export const forumTopicCreateSelectors = {
  isLoading: (state: { forumTopicCreate: ForumTopicCreateState }) =>
    state.forumTopicCreate.isLoading,
  error: (state: { forumTopicCreate: ForumTopicCreateState }) =>
    state.forumTopicCreate.error,
}
