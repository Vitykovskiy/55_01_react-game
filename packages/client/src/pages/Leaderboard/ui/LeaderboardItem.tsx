import s from './LeaderboardPage.module.scss'
import { Avatar, Text } from '@gravity-ui/uikit'
import { User } from '../model/types'

type LeaderboardItemProps = {
  user: User
  position: number
}

export const LeaderboardItem = ({ user, position }: LeaderboardItemProps) => {
  return (
    <div className={s.leaderboardItem}>
      <div className={s.leaderboardItemStart}>
        <Text variant="subheader-2" as="h2">
          {position}.
        </Text>
        <Avatar
          imgUrl={user.img}
          size="m"
          className={s['leaderboard-avatar']}
        />
        <Text variant="subheader-2" as="h2">
          {user.name}
        </Text>
      </div>
      <Text variant="subheader-2" as="h2">
        {user.score}
      </Text>
    </div>
  )
}
