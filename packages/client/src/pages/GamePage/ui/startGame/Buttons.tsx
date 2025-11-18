import { ButtonCustom, ButtonCustomProps } from '@shared/ui/buttonCustom'
import Section from '@shared/ui/Section'
import { useNavigate } from 'react-router-dom'

type ButtonType = 'startGame' | 'back'

type StartGameButtonCustomProps = ButtonCustomProps & {
  name: ButtonType
}

type ButtonsStyle = { buttons?: string }

type StartGameProps = {
  setIsCounter: React.Dispatch<React.SetStateAction<boolean>>
  classNamesButtonsComponents?: ButtonsStyle
}

export const COUNTER_STARTGAME = 1000

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

export const Buttons = ({
  setIsCounter,
  classNamesButtonsComponents,
}: StartGameProps) => {
  const navigate = useNavigate()

  const handleClick = (name: ButtonType) => () => {
    name === 'startGame' && setIsCounter(true)
    name === 'back' && navigate(-1)
  }

  return (
    <Section
      classNamesSectionComponents={{
        section: classNamesButtonsComponents?.buttons,
      }}>
      {buttonData.map(button => {
        const { name, text, view } = button

        return (
          <ButtonCustom
            key={name}
            name={name}
            handleClick={handleClick(name)}
            text={text}
            view={view && view}
          />
        )
      })}
    </Section>
  )
}
