import Layout from '@shared/ui/Layout'
import { Text } from '@gravity-ui/uikit'
import { useNavigate } from 'react-router-dom'
import s from './EndGame.module.scss'
import Section from '@shared/ui/Section'
import { Buttons, GameButtonsCustomProps } from './Buttons'
import { RoutePath } from '@shared/config/routing'

type EndGameProps = { score: number }

const buttonDataEnd: GameButtonsCustomProps[] = [
  {
    name: 'continue',
    text: 'Повторить',
  },
  {
    name: 'back',
    text: 'Назад',
    view: 'outlined-contrast',
  },
]

export const EndGame = ({ score = 0 }: EndGameProps) => {
  const navigate = useNavigate()

  const clickHandlers = {
    continue: () => navigate(RoutePath.Main),
    back: () => navigate(-1),
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
