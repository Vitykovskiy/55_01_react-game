// import { useNavigate } from 'react-router-dom'
import Section from '@shared/ui/Section'
// import { buttonDataStart } from './model/consts'
import { ButtonsProps, ButtonType } from './model/types'
import { ButtonCustom } from '@shared/ui/buttonCustom'

export const Buttons = ({
  objHandleClick,
  buttonData,
  // setIsCounter,
  classNamesButtonsComponents,
}: ButtonsProps) => {
  // const navigate = useNavigate()

  const handleClick = (name: ButtonType) => {
    return objHandleClick[name]
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
