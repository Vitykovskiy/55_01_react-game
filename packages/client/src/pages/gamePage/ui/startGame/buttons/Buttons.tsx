import { useNavigate } from 'react-router-dom'
import Section from '@shared/ui/Section'
import { buttonData, ButtonType } from './model/consts'
import { ButtonCustom } from '@shared/ui/buttomCustom'

type startGameProps = {
  setIsCounter: React.Dispatch<React.SetStateAction<boolean>>
}

export const Buttons = ({ setIsCounter }: startGameProps) => {
  const navigate = useNavigate()

  const handleClick = (name: ButtonType) => () => {
    name === 'startGame' && setIsCounter(true)
    name === 'back' && navigate(-1)
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
