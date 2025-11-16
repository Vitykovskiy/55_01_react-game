import Layout from '@shared/ui/Layout'
// import { StartGamePageProps } from '../model/types'
import { Button, Text } from '@gravity-ui/uikit'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '@shared/config/routing'
import s from './EndGame.module.scss'
import { StartGamePageProps } from '../../model/types'
import Section from '@shared/ui/Section'
import { Buttons } from '../buttons'
import { buttonDataEnd } from '../buttons/model/consts'

export const EndGame = ({ statusGame, setStatusGame }: StartGamePageProps) => {
  const navigate = useNavigate()

  const score = 23000

  const objHandleClick = {
    endGame: () => setStatusGame('start'),
    // back: () => navigate(-1),
    backEnd: () => navigate(-1),
  }
  // const handleClickReplay = () => {
  //   setStatusGame('start')
  // }
  // const handleClickExit = () => {
  //   navigate(RoutePath.Main)
  // }

  return (
    <div className={s.endGame} id={s.endGame}>
      <Layout title="конец игры">
        <Section>
          <Text as="p" variant="header-2" className={s.textWhite}>
            Вы проиграли
          </Text>
          <Text as="p" variant="subheader-2" className={s.textWhite}>
            Ваш счет:
            <Text variant="subheader-2" className={s.textWhite}>
              {score}
            </Text>
          </Text>
        </Section>
        <Buttons objHandleClick={objHandleClick} buttonData={buttonDataEnd} />

        {/* <div className={s.endGame__buttons}>
          <Button view="action" onClick={handleClickReplay}>
            Начать заново
          </Button>
          <Button view="action" onClick={handleClickExit}>
            в меню
          </Button>
        </div> */}
      </Layout>
    </div>
  )
}
