import { fetchForumTopics, ForumTopicComment } from '@entities/forum'
import { getCommentsByTopic, createCommentForTopic } from '@entities/forum/api'
import { CommentDto } from '@entities/forum/api/types'
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

  // TODO: Придумать, как получить данные пользователя по id
  const mapCommentDtoToView = (comment: CommentDto): ForumTopicComment => ({
    id: comment.id,
    firstName: 'Пользователь',
    lastName: String(comment.userId),
    avatarUrl: '',
    message: comment.content,
  })

  useEffect(() => {
    const parsedId = Number(topicId)

    if (Number.isNaN(parsedId)) {
      return
    }

    setIsLoadingComments(true)
    getCommentsByTopic(parsedId)
      .then(response => {
        setComments((response ?? []).map(mapCommentDtoToView))
      })
      .catch(() => {
        console.error('Ошибка загрузки комментариев.')
      })
      .finally(() => {
        setIsLoadingComments(false)
      })
  }, [topicId])

  const handleSubmit = async () => {
    if (!canSubmit) {
      return
    }

    const parsedId = Number(topicId)
    if (Number.isNaN(parsedId)) {
      return
    }

    const response = await createCommentForTopic(parsedId, {
      content: text.trim(),
    })
    if (response) {
      setComments(prevComments => [
        ...prevComments,
        mapCommentDtoToView(response),
      ])
      setText('')
      return
    }

    console.error('Ошибка отправки комментария')
  }

  return (
    <Loader show={isLoadingTopics && !topic}>
      <TopicPageLayout>
        {!topic ? (
          <Section pb>
            <Text as="p" variant="body-2">
              Тема не найдена или была удалена.
            </Text>
          </Section>
        ) : (
          <>
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
          </>
        )}
      </TopicPageLayout>
    </Loader>
  )
}
