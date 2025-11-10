import { Button, Text } from '@gravity-ui/uikit'
import { ForumCard, mockForumTopics } from '@entities/forum'
import { RoutePath, usePage } from '@shared/config/routing'
import Layout from '@shared/ui/Layout'
import Section from '@shared/ui/Section'
import { Link } from 'react-router-dom'

export const ForumPage = () => {
  usePage({})
  return (
    <Layout
      title="Форум"
      bottomPanel={
        <Section pb>
          <Link to={RoutePath.ForumCreateTopic}>
            <Button view="action" width="max">
              Создать тему
            </Button>
          </Link>
          <Link to="/">
            <Button view="outlined" width="max">
              Назад
            </Button>
          </Link>
        </Section>
      }
      withBottomPadding={false}>
      <Text as="h1" variant="header-1">
        Форум
      </Text>
      <Section pb>
        {mockForumTopics.map(card => (
          <ForumCard key={card.id} id={card.id} title={card.title} />
        ))}
      </Section>
    </Layout>
  )
}
