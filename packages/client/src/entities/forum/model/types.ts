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

export type ForumTopicsState = {
  topics: ForumTopic[]
  isLoadingTopics: boolean
  errorTopics: string
  isCreatingTopic: boolean
  errorCreateTopic: string
}
