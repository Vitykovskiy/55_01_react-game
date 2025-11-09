import { usePage } from '@shared/config/routing'
import Layout from '@shared/ui/Layout'
import { LeaderboardItem } from '@pages/leaderboard/LeaderboardItem'
import './Leaderboard.scss'
import { useNavigate } from 'react-router-dom'
export interface User {
  id: number
  name: string
  score: number
  img: string
}
export const LeaderboardPage = () => {
  usePage({}) // Для чего он нужен?
  const users: User[] = [
    { id: 1, name: 'Иван Никитин', score: 50000, img: '/leaderboard/tip.png' },
    {
      id: 2,
      name: 'Александр Крутой',
      score: 43000,
      img: '/leaderboard/tip.png',
    },
    { id: 3, name: 'Саня Серый', score: 23000, img: '/leaderboard/tip.png' },
    {
      id: 4,
      name: 'Добрыня Муромец',
      score: 1000,
      img: '/leaderboard/tip.png',
    },
  ]
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }
  return (
    <div>
      <Layout
        title="Лидерборд"
        description="Доска лидеров"
        variant="default"
        bottomPanel={
          <button className="button-back" onClick={handleBack}>
            Назад
          </button>
        }>
        <h1>Доска лидеров</h1>
        <div className="leaderboard-list">
          {users.map((user, index) => (
            <LeaderboardItem key={user.id} user={user} position={index + 1} />
          ))}
        </div>
      </Layout>
    </div>
  )
}
