import { fetchForumTopics, ForumTopicComment } from '@entities/forum'
import { Text } from '@gravity-ui/uikit'
import { usePage } from '@shared/config'
import { useDispatch, useSelector } from '@shared/store'
import { Loader } from '@shared/ui/Loader'
import Section from '@shared/ui/Section'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CommentFormSection } from './ui/CommentFormSection'
import { CommentsSection } from './ui/CommentsSection'
import { TopicPageLayout } from './ui/TopicPageLayout'
import { getCommentsByTopic } from '@entities/forum'
import { createCommentForTopic } from '@entities/forum'

export const TopicPage = () => {
  usePage({})
  const { topicId } = useParams<{ topicId: string }>()
  const { topics, isLoadingTopics } = useSelector(state => state.forumTopics)
  const dispatch = useDispatch()

  useEffect(() => {
    if (!topics.length) {
      dispatch(fetchForumTopics())
    }
  }, [])

  const topic = topics.find(item => item.id === topicId)

  const [comments, setComments] = useState<ForumTopicComment[]>([])
  const [isLoadingComments, setIsLoadingComments] = useState(false)

  const [text, setText] = useState('')
  const canSubmit = text.trim().length > 0

  useEffect(() => {
    ;(async () => {
      const parsedId = Number(topicId)

      if (Number.isNaN(parsedId)) {
        return
      }

      setIsLoadingComments(true)
      const comments = await getCommentsByTopic(parsedId)
      setComments(comments)
      setIsLoadingComments(false)
    })()
  }, [topicId])

  const handleSubmit = async () => {
    if (!canSubmit) {
      return
    }

    const parsedId = Number(topicId)
    if (Number.isNaN(parsedId)) {
      return
    }

    const newComment = await createCommentForTopic(parsedId, text)
    if (newComment) {
      setComments(prevComments => [...prevComments, newComment])
      setText('')
    }
  }

  if (!topic) {
    return (
      <Loader show={isLoadingTopics}>
        <TopicPageLayout>
          <Section pb>
            <Text as="p" variant="body-2">
              Тема не найдена или была удалена.
            </Text>
          </Section>
        </TopicPageLayout>
      </Loader>
    )
  }

  return (
    <Loader show={isLoadingTopics}>
      <TopicPageLayout>
        <Text as="h1" variant="header-1">
          {topic.title}
        </Text>
        <Section>
          <Text as="p" variant="body-2">
            {topic.text}
          </Text>
        </Section>
        <Loader show={isLoadingComments}>
          <CommentsSection comments={comments} />
        </Loader>
        <CommentFormSection
          text={text}
          canSubmit={canSubmit}
          onChange={setText}
          onSubmit={handleSubmit}
        />
      </TopicPageLayout>
    </Loader>
  )
}
