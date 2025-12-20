import { usePage } from '@shared/config/routing'
import Layout from '@shared/ui/Layout'
import { LeaderboardItem } from './LeaderboardItem'
import s from './LeaderboardPage.module.scss'
import { useNavigate } from 'react-router-dom'
import { Button, Loader, Text } from '@gravity-ui/uikit'
import { useEffect } from 'react'
import { getTopUserList } from '@entities/storeRedux/leaderboard/model/leaderboardSlice'
import { useDispatch, useSelectorStore } from '@entities/storeRedux'

export const LeaderboardPage = () => {
  usePage({})
  const { leaderboardList, isLoadingTopUserList } = useSelectorStore(
    state => state.leaderboardSlice
  )

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  useEffect(() => {
    // TODO: пример отправки результатов игры, удалить(перенести) в нужное место
    // import { postResultGameUser} from '@entities/storeRedux/leaderboard/model/leaderboardSlice'
    // import { useDispatch } from '@entities/storeRedux'

    // const dispatch = useDispatch();
    // const { data } = useSelectorStore((state) => state.userSlice)
    // dispatch(postResultGameUser({
    //   id: data?.id,
    //   firstName: data?.firstName,
    //   lastName: data?.lastName,
    //   scoreUser: score // результат игры
    // }))

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
