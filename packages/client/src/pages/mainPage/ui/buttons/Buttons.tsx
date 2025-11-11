import { ButtonCustom } from '../../../../shared/ui/buttonCustom/ButtonCustom'
import { buttonData } from '@pages/mainPage/model/consts'
import { useNavigate } from 'react-router-dom'
import { RoutePath } from '@shared/config/routing'
import Section from '@shared/ui/Section'

export const Buttons = () => {
  const navigate = useNavigate()

  const handleClickGame = () => {
    navigate(RoutePath.Game)
  }
  const handleClickLeaderboard = () => {
    navigate(RoutePath.Leaderboard)
  }
  const handleClickProfile = () => {
    navigate(RoutePath.Profile)
  }
  const handleClickForum = () => {
    navigate(RoutePath.Forum)
  }

  return (
    <Section>
      {buttonData.map(button => {
        const handleClick =
          button.name === 'game'
            ? handleClickGame
            : button.name === 'leaderboard'
            ? handleClickLeaderboard
            : button.name === 'profile'
            ? handleClickProfile
            : button.name === 'forum'
            ? handleClickForum
            : undefined

        return (
          <ButtonCustom
            name={button.name}
            handleClick={handleClick}
            text={button.text}
            view={button.view ? button.view : 'action'}
          />
        )
      })}
    </Section>
  )
}
