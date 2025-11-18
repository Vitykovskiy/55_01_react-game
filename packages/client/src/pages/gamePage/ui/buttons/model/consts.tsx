import { GameButtonsCustomProps } from './types'

export const buttonDataStart: GameButtonsCustomProps[] = [
  {
    name: 'startGame',
    text: 'Начать играть',
  },
  {
    name: 'backStart',
    text: 'Назад',
    view: 'outlined-contrast',
  },
]

export const buttonDataEnd: GameButtonsCustomProps[] = [
  {
    name: 'endGame',
    text: 'Повторить',
  },
  {
    name: 'backEnd',
    text: 'Назад',
    view: 'outlined-contrast',
  },
]
