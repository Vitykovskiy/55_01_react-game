import { Link } from 'react-router-dom'
import { RoutePath } from '../../config/routing'
import s from './style.module.scss'

export const Header = () => {
  return (
    <nav>
      <ul className={s.nav}>
        <li>
          <Link to={RoutePath.Main}>Главная</Link>
        </li>
        <li>
          <Link to={RoutePath.Login}>Логин</Link>
        </li>
        <li>
          <Link to={RoutePath.Register}>Регистрация</Link>
        </li>
        <li>
          <Link to={RoutePath.Profile}>Профиль</Link>
        </li>
        <li>
          <Link to={RoutePath.Game}>Игра</Link>
        </li>
        <li>
          <Link to={RoutePath.Leaderboard}>Лидерборд</Link>
        </li>
        <li>
          <Link to={RoutePath.Forum}>Форум</Link>
        </li>
      </ul>
    </nav>
  )
}
