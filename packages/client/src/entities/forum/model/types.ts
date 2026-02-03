export type ReactionCounts = Record<string, number>

export type ReactionsState = {
  counts: ReactionCounts
  myReactions: string[]
}

export type ReactionEmoji = {
  name: string
  icon: string
}

export type ForumTopicComment = {
  id: string
  firstName: string
  lastName: string
  avatarUrl: string
  message: string
  reactions?: ReactionsState
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

export type Reaction = {
  id: number
  type: string
  userId: number
  commentId: number
  createdAt: string
  updatedAt: string
}

export type ReactionDto = {
  counts: Record<string, number>
  myReactions: string[]
}
