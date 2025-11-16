import Layout from '@shared/ui/Layout'
import { StartGamePageProps } from '../model/types'
import { Button } from '@gravity-ui/uikit'
import s from './Game.module.scss'

export const Game = ({ statusGame, setStatusGame }: StartGamePageProps) => {
  const handleClick = () => {
    setStatusGame('end')
  }

  return (
    <div className={s.game}>
      <Layout title="игра">
        <Button className={s.game__button} view="action" onClick={handleClick}>
          Закончить
        </Button>
      </Layout>
    </div>
  )
}
