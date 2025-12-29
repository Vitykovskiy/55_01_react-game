import { Button, Loader, Text } from '@gravity-ui/uikit'
import { usePage } from '@shared/config'
import Layout from '@shared/ui/Layout'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import s from './LeaderboardPage.module.scss'
import { useDispatch, useSelector } from '@shared/store'
import { getTopUserList } from '@entities/leaderboard'
import { LeaderboardList } from './LeaderboardList'

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
        {isLoadingTopUserList ? <Loader /> : <LeaderboardList />}
        <Button className={s.buttonBack} view="action" onClick={handleBack}>
          Назад
        </Button>
      </Layout>
    </div>
  )
}
