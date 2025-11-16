import { useNavigate } from 'react-router-dom'
import Section from '@shared/ui/Section'
import { buttonData, ButtonType } from './model/consts'
import { ButtonCustom } from '@shared/ui/buttonCustom'

type ButtonsStyle = { buttons?: string }
type startGameProps = {
  setIsCounter: React.Dispatch<React.SetStateAction<boolean>>
  classNamesButtonsComponents?: ButtonsStyle
}

export const Buttons = ({
  setIsCounter,
  classNamesButtonsComponents,
}: startGameProps) => {
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
