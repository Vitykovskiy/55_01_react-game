import { Text } from '@gravity-ui/uikit'
import { LeaderboardItem } from './LeaderboardItem'
import s from './LeaderboardPage.module.scss'
import { useSelector } from '@shared/store'

export const LeaderboardList = () => {
  const { leaderboardList } = useSelector(state => state.leaderboard)

  return (
    <div className={s.leaderboardList}>
      {leaderboardList.length > 0 ? (
        leaderboardList.map((user, index) => (
          <LeaderboardItem key={index} user={user.data} position={index + 1} />
        ))
      ) : (
        <Text variant="subheader-3" as="h3">
          Пока нет участников в рейтинге
        </Text>
      )}
    </div>
  )
}
