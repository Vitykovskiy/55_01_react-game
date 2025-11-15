import Layout from '@shared/ui/Layout'
import { Text } from '@gravity-ui/uikit'
import s from './StartGame.module.scss'
import { Buttons } from './buttons/Buttons'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '@shared/config/routing'

export const StartGame = () => {
  const [isCounter, setIsCounter] = useState(false)
  const [counter, setCounter] = useState(3)

  const navigete = useNavigate()
  const setCounterContent = () => {
    return setCounter(counter - 1)
  }

  useEffect(() => {
    isCounter &&
      (counter > 0
        ? setTimeout(setCounterContent, 1000)
        : navigete(RoutePath.Main))
  }, [isCounter, counter])

  return (
    <div className={s.startGame} id={s.startGame}>
      <Layout title="начало игры">
        {isCounter ? (
          <Text as="p" className={s.textCounter} variant="display-4">
            {counter}
          </Text>
        ) : (
          <>
            <Text as="p" className={s.text} variant="body-2">
              В Magic Type вам нужно быстро и точно печатать появляющиеся на
              экране заклинания-слова: каждое правильно набранное слово
              мгновенно уничтожает врага, продвигающегося к вам; если промедлите
              или ошибётесь — противники приблизятся и нанесут урон.
              Сосредоточьтесь на приоритетных целях, тренируйте слепой набор,
              поддерживайте ритм без остановок и используйте редкие усиления,
              возникающие при быстрой серии точных слов — так вы дольше выживете
              и пройдёте уровни с максимальным счётом.
            </Text>
            <Buttons setIsCounter={setIsCounter} />
          </>
        )}
      </Layout>
    </div>
  )
}
