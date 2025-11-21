import Layout from '@shared/ui/Layout'
import { Text } from '@gravity-ui/uikit'
import { useNavigate } from 'react-router-dom'
import s from './EndGame.module.scss'
import Section from '@shared/ui/Section'
import { Buttons } from './Buttons'
import { RoutePath } from '@shared/config/routing'
import { GameButtonsCustomProps } from '../models/types'

export const EndGame = () => {
  const navigate = useNavigate()

  const score = 23000

  const buttonDataEnd: GameButtonsCustomProps[] = [
    {
      name: 'endGame',
      text: 'Повторить',
    },
    {
      name: 'backEnd',
      text: 'Назад',
      view: 'outlined-contrast',
    },
  ]

  const clickHandlers = {
    endGame: () => navigate(RoutePath.Main),
    backEnd: () => navigate(-1),
  }

  return (
    <Layout
      title="конец игры"
      classNamesLayoutComponents={{
        layout: s.layout,
        main: s.main,
        content: s.content,
      }}>
      <Section
        classNamesSectionComponents={{
          section: s.buttons,
        }}>
        <Text as="p" variant="header-2" className={s.text}>
          Вы проиграли
        </Text>
        <Text as="p" variant="subheader-2" className={s.text}>
          Ваш счет:&nbsp;
          <Text variant="subheader-2" className={s.text}>
            {score}
          </Text>
        </Text>
      </Section>
      <Buttons
        classNamesButtonsComponents={{ buttons: s.buttons }}
        clickHandlers={clickHandlers}
        buttonData={buttonDataEnd}
      />
    </Layout>
  )
}
