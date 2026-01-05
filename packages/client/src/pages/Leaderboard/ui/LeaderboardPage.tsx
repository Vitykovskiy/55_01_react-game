import { getTopUserList } from '@entities/leaderboard'
import { Button, Text } from '@gravity-ui/uikit'
import { usePage } from '@shared/config'
import { useDispatch, useSelector } from '@shared/store'
import Layout from '@shared/ui/Layout'
import { Loader } from '@shared/ui/Loader'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { LeaderboardList } from './LeaderboardList'
import s from './LeaderboardPage.module.scss'

export const LeaderboardPage = () => {
  usePage({})
  const { isLoadingTopUserList } = useSelector(state => state.leaderboard)

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
        <Loader show={isLoadingTopUserList}>
          <LeaderboardList />
        </Loader>
        <Button className={s.buttonBack} view="action" onClick={handleBack}>
          Назад
        </Button>
      </Layout>
    </div>
  )
}
