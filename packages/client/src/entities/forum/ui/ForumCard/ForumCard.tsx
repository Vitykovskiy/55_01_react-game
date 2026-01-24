import { Card, Text } from '@gravity-ui/uikit'
import s from './style.module.scss'
import { Link } from 'react-router-dom'
import type { ForumTopic } from '../../model/types'

export type ForumCardProps = ForumTopic

export const ForumCard = ({ id, title }: ForumCardProps) => {
  return (
    <Link to={`/forum/${id}`}>
      <Card className={s.forumCard}>
        <Text as="h2" variant="subheader-2">
          {title}
        </Text>
      </Card>
    </Link>
  )
}
