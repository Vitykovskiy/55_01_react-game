import { ErrorCode } from '@pages/errorPage'
import { RoutePath } from '@shared/config/routing'
import { RouteObject } from 'react-router-dom'
import {
  CreateTopicPage,
  ErrorPage,
  ForumPage,
  GamePage,
  LeaderboardPage,
  LoginPage,
  MainPage,
  ProfilePage,
  RegisterPage,
  TopicPage,
} from '../../pages'
import { PrivateRoute } from '@shared/ui/PrivateRoute'

const routeConfig = [
  { path: RoutePath.Main, element: MainPage, isPublic: false },
  { path: RoutePath.Login, element: LoginPage, isPublic: true },
  { path: RoutePath.Register, element: RegisterPage, isPublic: true },
  { path: RoutePath.Profile, element: ProfilePage, isPublic: false },
  { path: RoutePath.Game, element: GamePage, isPublic: false },
  { path: RoutePath.Leaderboard, element: LeaderboardPage, isPublic: false },
  { path: RoutePath.Forum, element: ForumPage, isPublic: false },
  {
    path: RoutePath.ForumCreateTopic,
    element: CreateTopicPage,
    isPublic: false,
  },
  { path: RoutePath.ForumTopic, element: TopicPage, isPublic: false },
  { path: '*', element: ErrorPage, isPublic: true },
] as const

export const routes: RouteObject[] = routeConfig.map(route => ({
  path: route.path,
  element: route.isPublic ? (
    <route.element />
  ) : (
    <PrivateRoute>
      <route.element />
    </PrivateRoute>
  ),
  errorElement: <ErrorPage code={ErrorCode.ServerError} />,
}))
