import { ForumCard, fetchForumTopics } from '@entities/forum'
import { Button, Text } from '@gravity-ui/uikit'
import { RoutePath, usePage } from '@shared/config'
import { useDispatch, useSelector } from '@shared/store'
import Layout from '@shared/ui/Layout'
import { Loader } from '@shared/ui/Loader'
import Section from '@shared/ui/Section'
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

export const ForumPage = () => {
  usePage({})
  const { topics, isLoadingTopics } = useSelector(state => state.forumTopics)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchForumTopics())
  }, [])

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
        <Loader show={isLoadingTopics}>
          {topics.map(topic => (
            <ForumCard key={topic.id} id={topic.id} title={topic.title} />
          ))}
        </Loader>
      </Section>
    </Layout>
  )
}
