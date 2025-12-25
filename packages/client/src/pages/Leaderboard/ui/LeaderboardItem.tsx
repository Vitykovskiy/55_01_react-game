import s from './LeaderboardPage.module.scss'
import { Avatar, Text } from '@gravity-ui/uikit'
import defaultAvatar from '../../../../public/avatar/tip.png'
import { LeaderboardDataUserGame } from '@entities/leaderboard'

type LeaderboardItemProps = {
  user: LeaderboardDataUserGame
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
          imgUrl={user.avatar ?? defaultAvatar}
          size="m"
          className={s['leaderboard-avatar']}
        />
        <Text variant="subheader-2" as="h2">
          {user.firstName + ' ' + user.lastName}
        </Text>
      </div>
      <Text variant="subheader-2" as="h2">
        {user.scoreUser}
      </Text>
    </div>
  )
}
