import { Dispatch, SetStateAction } from 'react'

export type StatusGame = 'start' | 'game' | 'end'

export type StartGamePageProps = {
  statusGame?: StatusGame
  setStatusGame: Dispatch<SetStateAction<StatusGame>>
}
