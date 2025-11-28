import Layout from '@shared/ui/Layout'
import { useEffect, useRef, useState } from 'react'
import s from './GamePage.module.scss'
import { Game } from './Game'
import { StartGame } from './StartGame'
import { EndGame } from './EndGame'

export type GamePhases = 'start' | 'playing' | 'end'

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<Game | null>(null)
  const [phase, setPhase] = useState<GamePhases>('start')
  const [score, setScore] = useState(0)

  const handleStart = () => {
    setScore(0)
    setPhase('playing')
  }

  const handleRestart = () => {
    setPhase('start')
  }

  useEffect(() => {
    if (phase !== 'playing') {
      return
    }

    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const game = new Game(canvas, {
      onEnd: finalScore => {
        setScore(finalScore)
        setPhase('end')
      },
    })

    gameRef.current = game
    game.start()

    return () => {
      game.stop()
      gameRef.current = null
    }
  }, [phase])

  if (phase === 'start') {
    return <StartGame onStart={handleStart} />
  }

  if (phase === 'end') {
    return <EndGame score={score} onRestart={handleRestart} />
  }

  return (
    <Layout variant="center" title="">
      <canvas className={s.canvas} ref={canvasRef} />
    </Layout>
  )
}
