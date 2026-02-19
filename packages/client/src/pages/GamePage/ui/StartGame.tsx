import { Text } from '@gravity-ui/uikit'
import s from './StartGame.module.scss'
import Layout from '@shared/ui/Layout'
import { useNavigate } from 'react-router-dom'
import { Buttons, GameButtonsCustomProps } from './Buttons'

const buttonDataStart: GameButtonsCustomProps[] = [
  {
    name: 'continue',
    text: 'Начать играть',
  },
  {
    name: 'back',
    text: 'Назад',
    view: 'outlined-contrast',
  },
]

export enum StartGameMode {
  Idle = 'idle',
  Loading = 'loading',
  Countdown = 'countdown',
}

type StartGameProps = {
  onStart: () => void
  onBack?: () => void
  mode?: StartGameMode
  countdown?: number
}

export const StartGame = ({
  onStart,
  onBack,
  mode = StartGameMode.Idle,
  countdown = 3,
}: StartGameProps) => {
  const navigate = useNavigate()

  const clickHandlers = {
    continue: onStart,
    back: () => (onBack ? onBack() : navigate(-1)),
  }

  return (
    <Layout
      title="начало игры"
      variant="center"
      classNamesLayoutComponents={{
        layout: s.layout,
        main: s.main,
        content: s.content,
      }}>
      {mode === StartGameMode.Loading ? (
        <Text as="p" className={s.textCounter} variant="display-4">
          Загрузка...
        </Text>
      ) : mode === StartGameMode.Countdown ? (
        <Text as="p" className={s.textCounter} variant="display-4">
          {countdown}
        </Text>
      ) : (
        <>
          <Text as="p" className={s.text} variant="body-2">
            В Magic Type вам нужно быстро и точно печатать появляющиеся на
            экране заклинания-слова: каждое правильно набранное слово мгновенно
            уничтожает врага, продвигающегося к вам; если промедлите или
            ошибётесь — противники приблизятся и нанесут урон. Сосредоточьтесь
            на приоритетных целях, тренируйте слепой набор, поддерживайте ритм
            без остановок и используйте редкие усиления, возникающие при быстрой
            серии точных слов — так вы дольше выживете и пройдёте уровни с
            максимальным счётом.
          </Text>
          <Buttons
            classNamesButtonsComponents={{ buttons: s.buttons }}
            clickHandlers={clickHandlers}
            buttonData={buttonDataStart}
          />
        </>
      )}
    </Layout>
  )
}
