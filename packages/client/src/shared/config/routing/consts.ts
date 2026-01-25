export const enum RoutePath {
  Login = '/login',
  OAuth = '/oauth',
  Register = '/register',
  Profile = '/profile',
  Main = '/',
  Game = '/game',
  Leaderboard = '/leaderboard',
  Forum = '/forum',
  ForumCreateTopic = '/forum/create',
  ForumTopic = '/forum/:topicId',
  Error404 = '/404',
}

export const BASE_URL = 'https://ya-praktikum.tech/api/v2'
export const REDIRECT_URI = 'http://localhost:3000/oauth'
