import {
  ForumPage,
  GamePage,
  LeaderboardPage,
  LoginPage,
  MainPage,
  ProfilePage,
  RegisterPage,
  TopicPage,
} from '../../pages'
import { NotFoundPage } from '@pages/NotFoundPage'
import { RoutePath } from '@shared/config/routing'

export const routes = [
  {
    path: RoutePath.Main,
    Component: MainPage,
    //TODO добавить fetchData функцию для SSR
    //  fetchData: () => {}
  },
  { path: RoutePath.Login, Component: LoginPage },
  { path: RoutePath.Register, Component: RegisterPage },
  { path: RoutePath.Profile, Component: ProfilePage },
  { path: RoutePath.Game, Component: GamePage },
  {
    path: RoutePath.Leaderboard,
    Component: LeaderboardPage,
  },
  { path: RoutePath.Forum, Component: ForumPage },
  { path: RoutePath.ForumTopic, Component: TopicPage },
  { path: '*', Component: NotFoundPage },
]
