export interface User {
  id: number
  name: string
  score: number
  img: string
}
export const users: User[] = [
  { id: 1, name: 'Иван Никитин', score: 50000, img: '/leaderboard/tip.png' },
  {
    id: 2,
    name: 'Александр Крутой',
    score: 43000,
    img: '/leaderboard/tip.png',
  },
  { id: 3, name: 'Саня Серый', score: 23000, img: '/leaderboard/tip.png' },
  {
    id: 4,
    name: 'Добрыня Муромец',
    score: 1000,
    img: '/leaderboard/tip.png',
  },
]
