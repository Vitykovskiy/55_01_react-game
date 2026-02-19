import Layout from '@shared/ui/Layout'
import { useEffect, useRef, useState } from 'react'
import s from './GamePage.module.scss'
import { initAssets } from '../lib/AssetsManager/assets'
import { Game } from './Game'
import { StartGame, StartGameMode } from './StartGame'
import { EndGame } from './EndGame'

export enum GamePhase {
  Start = 'start',
  Loading = 'loading',
  Countdown = 'countdown',
  Playing = 'playing',
  End = 'end',
}

const COUNTER_STARTGAME = 3
const DELAY_COUNTER_STARTGAME = 1000

function toggleFullScreen(element: Element) {
  if (document.fullscreenElement) {
    document.exitFullscreen?.()
    return
  }

  element.requestFullscreen()
}

const handleWindowDoubleClick = () => {
  toggleFullScreen(window.document.body)
}

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<Game | null>(null)
  const [phase, setPhase] = useState<GamePhase>(GamePhase.Start)
  const [score, setScore] = useState(0)
  const [countdown, setCountdown] = useState(COUNTER_STARTGAME)

  useEffect(() => {
    if (phase !== GamePhase.Loading) {
      return
    }

    let isMounted = true

    const loadAssets = async () => {
      try {
        await initAssets()

        if (!isMounted) {
          return
        }

        setCountdown(COUNTER_STARTGAME)
        setPhase(GamePhase.Countdown)
      } catch (error) {
        console.error('Ошибка при инициализации ассетов', error)

        if (isMounted) {
          setPhase(GamePhase.Start)
        }
      }
    }

    loadAssets()

    return () => {
      isMounted = false
    }
  }, [phase])

  useEffect(() => {
    if (phase !== GamePhase.Countdown) {
      return
    }

    const timer = setTimeout(() => {
      if (countdown <= 1) {
        setPhase(GamePhase.Playing)
        return
      }

      setCountdown(prev => prev - 1)
    }, DELAY_COUNTER_STARTGAME)

    return () => clearTimeout(timer)
  }, [phase, countdown])

  useEffect(() => {
    if (phase !== GamePhase.Playing) {
      return
    }

    const canvas = canvasRef.current
    if (!canvas) {
      return
    }

    const game = new Game(canvas, {
      onEnd: finalScore => {
        setScore(finalScore)
        setPhase(GamePhase.End)
      },
    })

    gameRef.current = game
    game.start()

    return () => {
      game.stop()
      gameRef.current = null
    }
  }, [phase])

  useEffect(() => {
    window.addEventListener('dblclick', handleWindowDoubleClick)
    return () => {
      window.removeEventListener('dblclick', handleWindowDoubleClick)
    }
  }, [])

  if (
    phase === GamePhase.Start ||
    phase === GamePhase.Loading ||
    phase === GamePhase.Countdown
  ) {
    return (
      <StartGame
        mode={
          phase === GamePhase.Loading
            ? StartGameMode.Loading
            : phase === GamePhase.Countdown
            ? StartGameMode.Countdown
            : StartGameMode.Idle
        }
        countdown={countdown}
        onStart={() => {
          setScore(0)
          setPhase(GamePhase.Loading)
        }}
      />
    )
  }

  if (phase === GamePhase.End) {
    return <EndGame score={score} onRestart={() => setPhase(GamePhase.Start)} />
  }

  return (
    <Layout variant="center" title="">
      <canvas className={s.canvas} ref={canvasRef} />
    </Layout>
  )
}
