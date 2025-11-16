import { usePage } from '@shared/config/routing'
import { useState } from 'react'
import { Game } from './Game'
import { StartGame } from './startGame/StartGame'
import { EndGame } from './endGame'
import { StatusGame } from '../model/types'
import s from './GamePage.module.scss'

export const GamePage = () => {
  usePage({})

  const [statusGame, setStatusGame] = useState<StatusGame>('start')

  if (statusGame === 'start') {
    return <StartGame statusGame={statusGame} setStatusGame={setStatusGame} />
  }

  return (
    <div className={s.gamePage}>
      <Game statusGame={statusGame} setStatusGame={setStatusGame} />
      {statusGame === 'end' && (
        <EndGame statusGame={statusGame} setStatusGame={setStatusGame} />
      )}
    </div>
  )
}
