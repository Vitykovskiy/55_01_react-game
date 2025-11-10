import { Text } from '@gravity-ui/uikit'
import { mockForumTopics } from '@entities/forum'
import { usePage } from '@shared/config/routing'
import Section from '@shared/ui/Section'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { CommentFormSection } from './components/CommentFormSection'
import { CommentsSection } from './components/CommentsSection'
import { TopicPageLayout } from './components/TopicPageLayout'

export const TopicPage = () => {
  usePage({})
  const { topicId } = useParams<{ topicId: string }>()
  const topic = mockForumTopics.find(item => item.id === topicId)

  const [text, setText] = useState('')
  const canSubmit = text.trim().length > 0

  if (!topic) {
    return (
      <TopicPageLayout>
        <Section pb>
          <Text as="p" variant="body-2">
            Тема не найдена или была удалена.
          </Text>
        </Section>
      </TopicPageLayout>
    )
  }

  return (
    <TopicPageLayout>
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
      />
    </TopicPageLayout>
  )
}
