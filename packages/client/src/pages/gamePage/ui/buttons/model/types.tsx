import { ButtonCustomProps } from '@shared/ui/buttonCustom'

export type ButtonType = 'startGame' | 'backStart' | 'endGame' | 'backEnd'

export type StartGameButtonCustomProps = ButtonCustomProps & {
  name: ButtonType
}

export type ButtonsProps = {
  objHandleClick: { [key: string]: () => void }
  buttonData: StartGameButtonCustomProps[]
}
