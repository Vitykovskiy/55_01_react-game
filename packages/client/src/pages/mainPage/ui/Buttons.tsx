import { ButtonCustom } from '@shared/ui/buttonCustom/ButtonCustom'
import { buttonData, ButtonType } from '../model/consts'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '@shared/config/routing'
import Section from '@shared/ui/Section'

export const Buttons = () => {
  const navigate = useNavigate()

  const routings: Record<ButtonType, RoutePath> = {
    game: RoutePath.Game,
    leaderboard: RoutePath.Leaderboard,
    profile: RoutePath.Profile,
    forum: RoutePath.Forum,
  }

  const handleClick = (name: ButtonType) => () => {
    navigate(routings[name])
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
