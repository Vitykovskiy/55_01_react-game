import Section from '@shared/ui/Section'
import { ButtonCustom, ButtonCustomProps } from '@shared/ui/buttonCustom'

type ButtonType = 'continue' | 'back'

export type GameButtonsCustomProps = ButtonCustomProps & {
  name: ButtonType
}

type ButtonsStyle = { buttons?: string }

type ButtonsProps = {
  // clickHandlers: { [key: string]: () => void }
  clickHandlers: Record<ButtonType, () => void>

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
