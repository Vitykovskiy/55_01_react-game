import { usePage } from '@shared/config/routing'
import Layout from '@shared/ui/Layout'
import { LeaderboardItem } from './LeaderboardItem'
import s from './Leaderboard.module.scss'
import { useNavigate } from 'react-router-dom'
import { users } from './model/consts'
import { Button, Text } from '@gravity-ui/uikit'

export const LeaderboardPage = () => {
  usePage({})

  const navigate = useNavigate()
  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div>
      <Layout title="Лидерборд" description="Доска лидеров" variant="default">
        <Text variant="header-1" as="h1">
          Доска лидеров
        </Text>
        <div className={s.leaderboardList}>
          {users.length > 0 ? (
            users.map((user, index) => (
              <LeaderboardItem key={user.id} user={user} position={index + 1} />
            ))
          ) : (
            <Text variant="subheader-3" as="h3">
              Пока нет участников в рейтинге
            </Text>
          )}
        </div>
        <Button className={s.buttonBack} view="action" onClick={handleBack}>
          Назад
        </Button>
      </Layout>
    </div>
  )
}
