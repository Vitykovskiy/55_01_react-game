import Layout from '@shared/ui/Layout'
import { Text } from '@gravity-ui/uikit'
import s from './StartGame.module.scss'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { COUNTER_STARTGAME } from './model/consts'
import { Buttons } from '../buttons'
import { RoutePath } from '@shared/config/routing'
import { GameButtonsCustomProps } from '../../model/types'

export const StartGame = () => {
  const [isCounter, setIsCounter] = useState(false)
  const [counter, setCounter] = useState(3)

  const navigate = useNavigate()

  const setCounterContent = () => {
    return setCounter(counter - 1)
  }

  const buttonDataStart: GameButtonsCustomProps[] = [
    {
      name: 'startGame',
      text: 'Начать играть',
    },
    {
      name: 'backStart',
      text: 'Назад',
      view: 'outlined-contrast',
    },
  ]

  const clickHandlers = {
    startGame: () => setIsCounter(true),
    backStart: () => navigate(-1),
  }

  useEffect(() => {
    if (!isCounter) {
      return
    }

    if (counter > 0) {
      setTimeout(setCounterContent, COUNTER_STARTGAME)
      return
    }

    navigate(RoutePath.Main)
  }, [isCounter, counter])

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
