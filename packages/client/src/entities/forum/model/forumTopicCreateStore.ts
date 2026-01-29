import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreateTopicPayload } from '../api/types'
import { ForumTopicCreateState } from './types'
import { createTopic } from '../lib/forumTopic'
import { ForumTopic } from './types'

const initialState: ForumTopicCreateState = {
  isLoading: false,
  error: '',
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
      state.error = ''
    })
    builder.addCase(createForumTopic.rejected, state => {
      state.isLoading = false
      state.error = 'Ошибка создания темы!'
    })
    builder.addCase(createForumTopic.fulfilled, state => {
      state.isLoading = false
      state.error = ''
    })
  },
})

export const forumTopicCreateReducer = forumTopicCreateSlice.reducer
