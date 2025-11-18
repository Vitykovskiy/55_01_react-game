import { ButtonCustomProps } from '@shared/ui/buttonCustom'

export type ButtonType = 'startGame' | 'backStart' | 'endGame' | 'backEnd'

export type GameButtonsCustomProps = ButtonCustomProps & {
  name: ButtonType
}

type ButtonsStyle = { buttons?: string }

export type ButtonsProps = {
  objHandleClick: { [key: string]: () => void }
  buttonData: GameButtonsCustomProps[]
  setIsCounter?: React.Dispatch<React.SetStateAction<boolean>>
  classNamesButtonsComponents?: ButtonsStyle
}
