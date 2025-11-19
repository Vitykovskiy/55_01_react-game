import { usePage } from '@shared/config/routing'
import { StartGame } from './StartGame'

export const GamePage = () => {
  usePage({})

  return (
    <div>
      <StartGame />
    </div>
  )
}
