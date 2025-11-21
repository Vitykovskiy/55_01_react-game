import { ButtonCustomProps } from '@shared/ui/buttonCustom'

export type ButtonType = 'startGame' | 'backStart' | 'endGame' | 'backEnd'

export type GameButtonsCustomProps = ButtonCustomProps & {
  name: ButtonType
}
