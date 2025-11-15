// import { useNavigate } from 'react-router-dom'
import Section from '@shared/ui/Section'
import { buttonData, ButtonType } from './model/consts'
import { ButtonCustom } from '@shared/ui/buttomCustom'
import { ButtonsProps } from './model/types'

export const Buttons = ({ objHandleClick }: ButtonsProps) => {
  // const navigate = useNavigate()

  const handleClick = (name: ButtonType) => {
    return objHandleClick[name]
  }

  return (
    <Section>
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
