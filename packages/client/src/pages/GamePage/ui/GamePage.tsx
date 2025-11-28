import Layout from '@shared/ui/Layout'
import { useEffect, useRef } from 'react'
import { Game } from './Game'
import s from './GamePage.module.scss'

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

  useEffect(() => {
    window.addEventListener('dblclick', handleWindowDoubleClick)
    const canvas = canvasRef.current

    if (!canvas) {
      return
    }

    const game = new Game(canvas)
    game.start()

    return () => {
      game.stop()
      window.removeEventListener('dblclick', handleWindowDoubleClick)
    }
  }, [])

  return (
    <Layout variant="center" title="">
      <canvas className={s.canvas} tabIndex={0} ref={canvasRef} />
    </Layout>
  )
}
