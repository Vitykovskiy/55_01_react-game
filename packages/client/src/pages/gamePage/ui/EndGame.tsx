import Layout from '@shared/ui/Layout'
import { StartGameProps } from '../model/types'
import { Button } from '@gravity-ui/uikit'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '@shared/config/routing'
import s from './EndGame.module.scss'

export const EndGame = ({ statusGame, setStatusGame }: StartGameProps) => {
  const navigate = useNavigate()

  const handleClickReplay = () => {
    setStatusGame('start')
  }
  const handleClickExit = () => {
    navigate(RoutePath.Main)
  }

  return (
    <div className={s.endGame}>
      <Layout title="конец игры">
        <div className={s.endGame__buttons}>
          <Button view="action" onClick={handleClickReplay}>
            Начать заново
          </Button>
          <Button view="action" onClick={handleClickExit}>
            в меню
          </Button>
        </div>
      </Layout>
    </div>
  )
}
