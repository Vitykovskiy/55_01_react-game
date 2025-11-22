import Layout from '@shared/ui/Layout'
import { useEffect, useRef } from 'react'
import s from './GamePage.module.scss'
import { Game } from './Game'

export const GamePage = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const game = new Game(canvas)
    game.start()

    return () => {
      game.stop()
    }
  }, [])

  return (
    <Layout variant="center" title="">
      <canvas className={s.canvas} ref={canvasRef} />
    </Layout>
  )
}
