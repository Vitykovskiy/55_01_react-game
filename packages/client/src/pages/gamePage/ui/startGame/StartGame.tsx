import Layout from '@shared/ui/Layout'
import { StartGameProps } from '../../model/types'
import { Button, Text } from '@gravity-ui/uikit'
import s from './StartGame.module.scss'
import backgroundStartPage from '../../../../public/game/startGame.png'
import Section from '@shared/ui/Section'

export const StartGame = ({ statusGame, setStatusGame }: StartGameProps) => {
  const handleClick = () => {
    setStatusGame('game')
  }
  return (
    <div className={s.startGame} id={s.startGame}>
      <Layout title="начало игры">
        {/* <Section> */}
        {/* <img className={s.background} src={backgroundStartPage} alt='фон'/> */}
        {/* <Section> */}
        <Text as="p" className={s.text} variant="body-2">
          В Magic Type вам нужно быстро и точно печатать появляющиеся на экране
          заклинания-слова: каждое правильно набранное слово мгновенно
          уничтожает врага, продвигающегося к вам; если промедлите или ошибётесь
          — противники приблизятся и нанесут урон. Сосредоточьтесь на
          приоритетных целях, тренируйте слепой набор, поддерживайте ритм без
          остановок и используйте редкие усиления, возникающие при быстрой серии
          точных слов — так вы дольше выживете и пройдёте уровни с максимальным
          счётом.
        </Text>

        {/* <Button
              className={s.startGame__button}
              view="action"
              width='max'
              onClick={handleClick}
            >
              Начать играть
            </Button>
            <Button
              className={s.startGame__button}
              view="outlined"
              width='max'
              onClick={handleClick}
            >
              Назад
            </Button> */}

        {/* </Section> */}
        {/* </Section> */}
      </Layout>
    </div>
  )
}
