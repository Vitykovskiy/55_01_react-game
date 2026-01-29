import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { CreateTopicPayload } from '../api/types'
import { ForumTopic, ForumTopicsState } from './types'
import { createTopic, getTopics } from '../lib/forumTopic'

const initialState: ForumTopicsState = {
  topics: [],
  isLoadingTopics: false,
  errorTopics: '',
  isCreatingTopic: false,
  errorCreateTopic: '',
}

export const fetchForumTopics = createAsyncThunk(
  'forum/fetchTopics',
  async (): Promise<ForumTopic[]> => {
    return getTopics()
  }
)

export const createForumTopic = createAsyncThunk(
  'forum/createTopic',
  async (data: CreateTopicPayload): Promise<ForumTopic | null> => {
    return createTopic(data)
  }
)

const forumTopicsSlice = createSlice({
  name: 'forumTopics',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchForumTopics.pending, state => {
      state.isLoadingTopics = true
      state.errorTopics = ''
    })
    builder.addCase(fetchForumTopics.rejected, state => {
      state.isLoadingTopics = false
      state.errorTopics = 'Ошибка загрузки тем!'
    })
    builder.addCase(fetchForumTopics.fulfilled, (state, action) => {
      state.isLoadingTopics = false
      state.errorTopics = ''
      state.topics = action.payload
    })

    builder.addCase(createForumTopic.pending, state => {
      state.isCreatingTopic = true
      state.errorCreateTopic = ''
    })
    builder.addCase(createForumTopic.rejected, state => {
      state.isCreatingTopic = false
      state.errorCreateTopic = 'Ошибка создания темы!'
    })
    builder.addCase(createForumTopic.fulfilled, (state, action) => {
      state.isCreatingTopic = false
      state.errorCreateTopic = ''
      if (action.payload) {
        state.topics.unshift(action.payload)
      }
    })
  },
})

export const forumTopicsReducer = forumTopicsSlice.reducer
