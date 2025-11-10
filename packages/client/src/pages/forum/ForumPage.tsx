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
          <Button
            view="action"
            width="max"
            component={Link}
            to={RoutePath.ForumCreateTopic}>
            Создать тему
          </Button>
          <Button view="outlined" width="max" component={Link} to={'/'}>
            Назад
          </Button>
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
