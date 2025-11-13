import Layout from '@shared/ui/Layout'
import { StartGameProps } from '../model/types'
import { Button } from '@gravity-ui/uikit'
import s from './Game.module.scss'
import classNames from 'classnames'

export const Game = ({ statusGame, setStatusGame }: StartGameProps) => {
  const handleClick = () => {
    setStatusGame('end')
  }

  return (
    <div className={classNames(s.game, statusGame === 'end' ? s.game_end : '')}>
      <Layout title="игра">
        <Button className={s.game__button} view="action" onClick={handleClick}>
          наигрался
        </Button>
      </Layout>
    </div>
  )
}
