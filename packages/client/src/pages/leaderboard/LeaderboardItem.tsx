import './Leaderboard.scss'
import { User } from '@pages/leaderboard/LeaderboardPage'
interface LeaderboardItemProps {
  user: User
  position: number
}

export const LeaderboardItem = ({ user, position }: LeaderboardItemProps) => {
  return (
    <div className="leaderboard-item">
      <div className="leaderboard-item__left">
        <span>{position}.</span>
        <img
          src={user.img}
          alt="Аватар пользователя"
          className="leaderboard-avatar"
        />
        <span>{user.name}</span>
      </div>
      <span>{user.score}</span>
    </div>
  )
}
