import { usePage } from '@shared/config/routing'
import { StartGame } from './startGame'

export const GamePage = () => {
  usePage({})

  return (
    <div>
      <StartGame />
    </div>
  )
}
