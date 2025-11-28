import { Text } from '@gravity-ui/uikit'
import s from './StartGame.module.scss'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Buttons, GameButtonsCustomProps } from './Buttons'
import Layout from '@shared/ui/Layout'

const COUNTER_STARTGAME = 3
const DELAY_COUNTER_STARTGAME = 1000

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

type StartGameProps = {
  onStart: () => void
  onBack?: () => void
}

export const StartGame = ({ onStart, onBack }: StartGameProps) => {
  const [isCounter, setIsCounter] = useState(false)
  const [counter, setCounter] = useState(COUNTER_STARTGAME)

  const navigate = useNavigate()

  const decrementCounter = () => {
    return setCounter(prev => prev - 1)
  }

  const clickHandlers = {
    continue: () => setIsCounter(true),
    back: () => (onBack ? onBack() : navigate(-1)),
  }

  useEffect(() => {
    if (!isCounter) {
      return
    }

    if (counter > 0) {
      const timer = setTimeout(decrementCounter, DELAY_COUNTER_STARTGAME)
      return () => clearTimeout(timer)
    }

    onStart()
  }, [isCounter, counter, onStart])

  return (
    <Layout
      title="начало игры"
      variant="center"
      classNamesLayoutComponents={{
        layout: s.layout,
        main: s.main,
        content: s.content,
      }}>
      {isCounter ? (
        <Text as="p" className={s.textCounter} variant="display-4">
          {counter}
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
