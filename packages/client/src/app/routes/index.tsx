import { ErrorCode } from '@pages/errorPage/model/types'
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
import { ErrorPage } from '@pages/errorPage/ui/ErrorPage'
import { RoutePath } from '@shared/config/routing'
import { RouteObject } from 'react-router-dom'

export const routes: RouteObject[] = [
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
  { path: '*', Component: ErrorPage },
].map(routeData => ({
  ...routeData,
  errorElement: <ErrorPage code={ErrorCode.ServerError} />,
}))
