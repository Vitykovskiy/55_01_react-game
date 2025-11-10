import { Avatar, Button, Text } from '@gravity-ui/uikit'
import { RoutePath, usePage } from '@shared/config/routing'
import s from './MainPage.module.scss'
import Layout from '@shared/ui/Layout'
import logoMain from '../../../../public/main/logo.svg'
import icon from '../../../../public/vite.svg'
import Section from '@shared/ui/Section'
import { useNavigate } from 'react-router-dom'

export const MainPage = () => {
  usePage({})
  const navigate = useNavigate()

  const handleClickGame = () => {
    navigate(RoutePath.Game)
  }
  const handleClickLeaderboard = () => {
    navigate(RoutePath.Leaderboard)
  }
  const handleClickProfile = () => {
    navigate(RoutePath.Profile)
  }
  const handleClickForum = () => {
    navigate(RoutePath.Forum)
  }

  return (
    <div className={s.mainPage}>
      <Layout variant="center" title="Главная">
        {/* <Avatar imgUrl={logoMain} shape='square' className={s.mainPage__img} ></Avatar> */}
        <img className={s.mainPage__logo} src={logoMain} alt="логотип" />
        <Text className={s.mainPage__text} as="p" variant="body-2">
          Magic Type — увлекательная веб-игра, где скорость набора превращается
          в магию. Каждый правильно набранный текст — заклинание или удар меча.
          Побеждай чудовищ и докажи, что слова сильнее клинка.
        </Text>
        <Section>
          <Button
            view="action"
            width="max"
            type="button"
            name="game"
            onClick={handleClickGame}>
            Начать играть
          </Button>
          <Button
            view="outlined"
            width="max"
            type="button"
            name="leaderboard"
            onClick={handleClickLeaderboard}>
            Доска лидеров
          </Button>
          <Button
            view="outlined"
            width="max"
            type="button"
            name="profile"
            onClick={handleClickProfile}>
            Мой профиль
          </Button>
          <Button
            view="outlined"
            width="max"
            type="button"
            name="forum"
            onClick={handleClickForum}>
            Форум
          </Button>
        </Section>
      </Layout>
    </div>
  )
}
