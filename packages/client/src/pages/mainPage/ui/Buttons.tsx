import { ButtonCustom } from '@shared/ui/buttonCustom'
import { buttonData, ButtonType } from '../model/consts'
import { Link } from 'react-router-dom'
import { RoutePath } from '@shared/config/routing'
import Section from '@shared/ui/Section'

type mainPageProps = {
  classNamesButtonsComponents?: { buttons: string }
}

export const Buttons = ({ classNamesButtonsComponents }: mainPageProps) => {
  const routings: Record<ButtonType, RoutePath> = {
    game: RoutePath.Game,
    leaderboard: RoutePath.Leaderboard,
    profile: RoutePath.Profile,
    forum: RoutePath.Forum,
  }

  return (
    <Section
      classNamesSectionComponents={{
        section: classNamesButtonsComponents?.buttons,
      }}>
      {buttonData.map(button => {
        const { name, text, view } = button
        return (
          <Link to={routings[name]} key={name}>
            <ButtonCustom name={name} text={text} view={view} />
          </Link>
        )
      })}
    </Section>
  )
}
