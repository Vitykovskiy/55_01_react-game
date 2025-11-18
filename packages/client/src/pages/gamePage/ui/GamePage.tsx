import { usePage } from '@shared/config/routing'
import { useState } from 'react'
import { Game } from './Game'
import { EndGame } from './endGame'
import { StatusGame } from '../model/types'
import { StartGame } from './startGame'

export const GamePage = () => {
  usePage({})

  const [statusGame, setStatusGame] = useState<StatusGame>('start')

  if (statusGame === 'start') {
    return <StartGame statusGame={statusGame} setStatusGame={setStatusGame} />
  }
  if (statusGame === 'end') {
    return <EndGame statusGame={statusGame} setStatusGame={setStatusGame} />
  }

  return (
    <div>
      <Game statusGame={statusGame} setStatusGame={setStatusGame} />
    </div>
  )
}
