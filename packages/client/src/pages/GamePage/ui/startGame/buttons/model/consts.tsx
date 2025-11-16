import { ButtonCustomProps } from '@shared/ui/buttonCustom'

export type ButtonType = 'startGame' | 'back'

type StartGameButtonCustomProps = ButtonCustomProps & {
  name: ButtonType
}

export const buttonData: StartGameButtonCustomProps[] = [
  {
    name: 'startGame',
    text: 'Начать играть',
  },
  {
    name: 'back',
    text: 'Назад',
    view: 'outlined-contrast',
  },
]
