import { mockForumTopics } from '@entities/forum'
import { Text } from '@gravity-ui/uikit'
import { usePage } from '@shared/config'
import Section from '@shared/ui/Section'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CommentFormSection } from './ui/CommentFormSection'
import { CommentsSection } from './ui/CommentsSection'
import { TopicPageLayout } from './ui/TopicPageLayout'

export const TopicPage = () => {
  usePage({})
  const { topicId } = useParams<{ topicId: string }>()
  const topic = mockForumTopics.find(item => item.id === topicId)

  const [text, setText] = useState('')
  const canSubmit = text.trim().length > 0
  const handleSubmit = () => {
    if (!canSubmit) {
      return
    }
    // TODO: дописать логику отправки комментария на сервер
    setText('')
  }

  return (
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
          <CommentsSection comments={topic.comments ?? []} />
          <CommentFormSection
            text={text}
            canSubmit={canSubmit}
            onChange={setText}
            onSubmit={handleSubmit}
          />
        </>
      )}
    </TopicPageLayout>
  )
}
