import { ButtonCustomProps } from '@shared/ui/buttonCustom'

export type ButtonType = 'leaderboard' | 'game' | 'profile' | 'forum'

type MainPageButtonCustomProps = ButtonCustomProps & {
  name: ButtonType
}

export const buttonData: MainPageButtonCustomProps[] = [
  {
    name: 'game',
    text: 'Начать играть',
  },
  {
    name: 'leaderboard',
    text: 'Доска лидеров',
    view: 'outlined',
  },
  {
    name: 'profile',
    text: 'Мой профиль',
    view: 'outlined',
  },
  {
    name: 'forum',
    text: 'Форум',
    view: 'outlined',
  },
]
