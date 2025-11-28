import Layout from '@shared/ui/Layout'
import { useEffect, useRef, useState } from 'react'
import s from './GamePage.module.scss'
import { initAssets } from '../lib/AssetsManager/assets'
import { Game } from './Game'
import { StartGame } from './StartGame'
import { EndGame } from './EndGame'

export type GamePhases = 'start' | 'playing' | 'end'

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
  const [phase, setPhase] = useState<GamePhases>('start')
  const [score, setScore] = useState(0)
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    let isMounted = true

    const init = async () => {
      try {
        setLoading(true)
        await initAssets()
      } catch (error) {
        console.error('Ошибка при инициализации ассетов', error)
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    init()

    return () => {
      isMounted = false
    }
  }, [])

  useEffect(() => {
    if (phase !== 'playing' || isLoading) {
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
  }, [phase, isLoading])

  useEffect(() => {
    window.addEventListener('dblclick', handleWindowDoubleClick)
    return () => {
      window.removeEventListener('dblclick', handleWindowDoubleClick)
    }
  }, [])

  if (phase === 'start') {
    return (
      <StartGame
        onStart={() => {
          setScore(0)
          setPhase('playing')
        }}
      />
    )
  }

  if (phase === 'end') {
    return <EndGame score={score} onRestart={() => setPhase('start')} />
  }

  return (
    <Layout variant="center" title="">
      {isLoading ? 'Loading' : ''}
      <canvas className={s.canvas} ref={canvasRef} />
    </Layout>
  )
}
