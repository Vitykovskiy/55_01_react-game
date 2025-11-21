import Section from '@shared/ui/Section'
import { ButtonType, GameButtonsCustomProps } from '../models/types'
import { ButtonCustom } from '@shared/ui/buttonCustom'

type ButtonsStyle = { buttons?: string }

type ButtonsProps = {
  clickHandlers: { [key: string]: () => void }
  buttonData: GameButtonsCustomProps[]
  classNamesButtonsComponents?: ButtonsStyle
}

export const Buttons = ({
  clickHandlers,
  buttonData,
  classNamesButtonsComponents,
}: ButtonsProps) => {
  const handleClick = (name: ButtonType) => {
    return clickHandlers[name]
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
