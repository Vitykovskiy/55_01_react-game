export type ForumTopicComment = {
  id: number
  firstName: string
  lastName: string
  avatarUrl: string
  message: string
}

export type ForumTopic = {
  id: string
  title: string
  text?: string
  comments?: ForumTopicComment[]
}

export enum ForumErrorCode {
  TopicsFetch = 'TOPICS_FETCH',
  TopicCreate = 'TOPIC_CREATE',
}

export type ForumTopicsListState = {
  topics: ForumTopic[]
  isLoading: boolean
  error: ForumError | null
}

export type ForumTopicCreateState = {
  isLoading: boolean
  error: ForumError | null
}

export type ForumError = { message: string; code: ForumErrorCode }
