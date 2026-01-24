export type TopicDto = {
  id: number
  title: string
  content: string
  userId: number
  createdAt?: string
  updatedAt?: string
}

export type CommentDto = {
  id: number
  content: string
  userId: number
  topicId: number
  parentCommentId: number | null
  createdAt?: string
  updatedAt?: string
}

export type CreateTopicPayload = {
  title: string
  content: string
}

export type CreateCommentPayload = {
  content: string
  topicId: number
  parentCommentId?: number | null
}
