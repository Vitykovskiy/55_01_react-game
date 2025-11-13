import Layout from '@shared/ui/Layout'
import { StartGameProps } from '../model/types'
import { Button } from '@gravity-ui/uikit'
import s from './StartGame.module.scss'

export const StartGame = ({ statusGame, setStatusGame }: StartGameProps) => {
  const handleClick = () => {
    setStatusGame('game')
  }
  return (
    <div className={s.startGame}>
      <Layout title="начало игры">
        <Button
          className={s.startGame__button}
          view="action"
          onClick={handleClick}>
          начать игру
        </Button>
      </Layout>
    </div>
  )
}
