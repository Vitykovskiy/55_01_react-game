import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { createTopic, getTopics } from '../api'
import { CreateTopicPayload, TopicDto } from '../api/types'
import { ForumTopic, ForumTopicsState } from './types'

const initialState: ForumTopicsState = {
  topics: [],
  isLoadingTopics: false,
  errorTopics: '',
  isCreatingTopic: false,
  errorCreateTopic: '',
}

const mapTopicDtoToForumTopic = (topic: TopicDto): ForumTopic => ({
  id: String(topic.id),
  title: topic.title,
  text: topic.content,
})

export const fetchForumTopics = createAsyncThunk(
  'forum/fetchTopics',
  async (): Promise<ForumTopic[]> => {
    const response = await getTopics()
    return (response ?? []).map(mapTopicDtoToForumTopic)
  }
)

export const createForumTopic = createAsyncThunk(
  'forum/createTopic',
  async (data: CreateTopicPayload): Promise<ForumTopic | undefined> => {
    const response = await createTopic(data)
    return response ? mapTopicDtoToForumTopic(response) : undefined
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
