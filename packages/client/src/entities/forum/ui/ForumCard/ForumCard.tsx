import { Card, Text } from '@gravity-ui/uikit'
import classNames from 'classnames'
import s from './style.module.scss'
import { Link } from 'react-router-dom'
import type { ForumTopic } from '../../model/mockForumTopics'

export type ForumCardProps = ForumTopic & {
  // дополнительные пропсы можно добавлять сюда при необходимости
}

export const ForumCard = ({ id, title }: ForumCardProps) => {
  return (
    <Link to={`/forum/${id}`}>
      <Card className={classNames(s['forum-card'])}>
        <Text as="h2" variant="subheader-2">
          {title}
        </Text>
      </Card>
    </Link>
  )
}
