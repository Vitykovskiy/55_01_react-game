import { Button, Text, TextArea } from '@gravity-ui/uikit'
import { mockForumTopics } from '@entities/forum'
import { usePage, RoutePath } from '@shared/config/routing'
import Layout from '@shared/ui/Layout'
import Section from '@shared/ui/Section'
import { Link, useParams } from 'react-router-dom'
import { CommentCard } from '@entities/forum/ui/CommentCard/CommentCard'
import { ChangeEvent, useState } from 'react'

export const TopicPage = () => {
  usePage({})
  const { topicId } = useParams<{ topicId: string }>()
  const topic = mockForumTopics.find(item => item.id === topicId)
  const comments = topic?.comments ?? []

  const [text, setText] = useState('')

  const canSubmit = text.trim().length > 0

  return (
    <Layout
      title=""
      alignItems="flex-start"
      bottomPanel={
        <Section pb>
          <Link to={RoutePath.Forum}>
            <Button view="outlined" width="max">
              Назад
            </Button>
          </Link>
        </Section>
      }
      withBottomPadding={false}>
      {topic ? (
        <>
          <Text as="h1" variant="header-1">
            {topic.title}
          </Text>
          <Section>
            <Text as="p" variant="body-2">
              {topic.text}
            </Text>
          </Section>
          <Section>
            <Text as="h2" variant="subheader-2">
              Комментарии:
            </Text>
            {comments.length ? (
              comments.map(comment => (
                <CommentCard key={comment.id} {...comment} />
              ))
            ) : (
              <Text as="p" variant="body-2">
                Будь первым, кто оставит комментарий.
              </Text>
            )}
          </Section>
          <Section pb>
            <Text as="h2" variant="subheader-2">
              Написать:
            </Text>
            <TextArea
              size="m"
              placeholder="Введите ваш комментарий здесь"
              minRows={8}
              value={text}
              onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                setText(event.target.value)
              }
            />
            <Button view="action" width="max" disabled={!canSubmit}>
              Добавить комментарий
            </Button>
          </Section>
        </>
      ) : (
        <Section pb>
          <Text as="p" variant="body-2">
            Тема не найдена или была удалена.
          </Text>
        </Section>
      )}
    </Layout>
  )
}
