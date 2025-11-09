import s from './Leaderboard.module.scss'
import { Avatar, Text } from '@gravity-ui/uikit'
import { User } from '@pages/leaderboard/model/consts'
interface LeaderboardItemProps {
  user: User
  position: number
}

export const LeaderboardItem = ({ user, position }: LeaderboardItemProps) => {
  return (
    <div className={s['leaderboard-item']}>
      <div className={s['leaderboard-item_start']}>
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
