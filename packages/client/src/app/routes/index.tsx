import {
  CreateTopicPage,
  ErrorPage,
  ForumPage,
  GamePage,
  LeaderboardPage,
  LoginPage,
  MainPage,
  OAuthPage,
  ProfilePage,
  RegisterPage,
  TopicPage,
} from '@pages'
import { ErrorCode } from '@pages/errorPage'
import { PageInitArgs, RoutePath } from '@shared/config'
import { PrivateRoute } from '../ui/PrivateRoute'

export type RouteConfig = {
  path: RoutePath | '*'
  element: React.FC
  isPublic: boolean
  fetchData?: (args: PageInitArgs) => void
}

const routeConfig: RouteConfig[] = [
  { path: RoutePath.Main, element: MainPage, isPublic: false },
  { path: RoutePath.Login, element: LoginPage, isPublic: true },
  { path: RoutePath.OAuth, element: OAuthPage, isPublic: true },
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

export const routes = routeConfig.map(route => ({
  path: route.path,
  element: route.isPublic ? (
    <route.element />
  ) : (
    <PrivateRoute>
      <route.element />
    </PrivateRoute>
  ),
  errorElement: <ErrorPage code={ErrorCode.ServerError} />,
  fetchData: route.fetchData,
}))
