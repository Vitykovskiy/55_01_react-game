import { Button, Loader, Text } from '@gravity-ui/uikit'
import { usePage } from '@shared/config'
import Layout from '@shared/ui/Layout'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { getTopUserList } from '@entities/leaderboard/model/leaderboardStore'
import { LeaderboardItem } from './LeaderboardItem'
import s from './LeaderboardPage.module.scss'
import { useDispatch, useSelector } from '@shared/store'

export const LeaderboardPage = () => {
  usePage({})
  const { leaderboardList, isLoadingTopUserList } = useSelector(
    state => state.leaderboard
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    dispatch(getTopUserList())
  }, [])

  return (
    <div>
      <Layout title="Лидерборд" description="Доска лидеров" variant="default">
        <Text variant="header-1" as="h1">
          Доска лидеров
        </Text>
        {isLoadingTopUserList ? (
          <Loader />
        ) : (
          <div className={s.leaderboardList}>
            {leaderboardList &&
            Array.isArray(leaderboardList) &&
            leaderboardList.length > 0 ? (
              leaderboardList.map((user, index) => (
                <LeaderboardItem key={index} user={user} position={index + 1} />
              ))
            ) : (
              <Text variant="subheader-3" as="h3">
                Пока нет участников в рейтинге
              </Text>
            )}
          </div>
        )}
        <Button className={s.buttonBack} view="action" onClick={handleBack}>
          Назад
        </Button>
      </Layout>
    </div>
  )
}
