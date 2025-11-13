import { Dispatch, SetStateAction } from 'react'

export type StatusGame = 'start' | 'game' | 'end'

export type StartGameProps = {
  statusGame?: StatusGame
  setStatusGame: Dispatch<SetStateAction<StatusGame>>
}
