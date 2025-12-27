import { Text } from '@gravity-ui/uikit'
import { LeaderboardItem } from './LeaderboardItem'
import s from './LeaderboardPage.module.scss'
import { useSelector } from '@shared/store'

export const LeaderboardList = () => {
  const { leaderboardList } = useSelector(state => state.leaderboard)

  if (leaderboardList.length > 0) {
    return (
      <div className={s.leaderboardList}>
        {leaderboardList.map((user, index) => (
          <LeaderboardItem key={index} user={user} position={index + 1} />
        ))}
      </div>
    )
  }

  return (
    <div className={s.leaderboardList}>
      <Text variant="subheader-3" as="h3">
        Пока нет участников в рейтинге
      </Text>
    </div>
  )
}
