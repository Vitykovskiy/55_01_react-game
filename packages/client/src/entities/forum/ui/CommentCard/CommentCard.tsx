import { Avatar, Card, Text } from '@gravity-ui/uikit'
import classNames from 'classnames'
import s from './style.module.scss'
import Section from '@shared/ui/Section'
import type { ForumTopicComment } from '../../model/mockForumTopics'

type CommentCardProps = ForumTopicComment

export const CommentCard = ({
  firstName,
  lastName,
  avatarUrl,
  message,
}: CommentCardProps) => {
  return (
    <Card className={classNames(s['comment-card'])}>
      <Section>
        <Section orientation="row" alignItems="center">
          <Avatar
            imgUrl={avatarUrl}
            size="m"
            className={classNames(s['avatar'])}
            alt={firstName}
            withImageBorder
            text={`${firstName + ' ' + lastName}`}
          />
          <Section>
            <Text as="h2" variant="subheader-2">
              {firstName} {lastName}
            </Text>
          </Section>
        </Section>
        <Section>
          <Text as="p" variant="body-2">
            {message}
          </Text>
        </Section>
      </Section>
    </Card>
  )
}
