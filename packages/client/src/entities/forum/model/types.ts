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

export type ForumTopicsListState = {
  topics: ForumTopic[]
  isLoading: boolean
  error: string
}

export type ForumTopicCreateState = {
  isLoading: boolean
  error: string
}
