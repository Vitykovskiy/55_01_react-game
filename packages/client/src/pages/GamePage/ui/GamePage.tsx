import Layout from '@shared/ui/Layout'
import { useEffect, useRef, useState } from 'react'
import s from './GamePage.module.scss'
import { initAssets } from '../lib/AssetsManager/assets'
import { Game } from './Game'

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
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    let game: Game | null = null

    const init = async () => {
      try {
        setLoading(true)
        await initAssets()
      } catch (error) {
        console.error('Ошибка при инициализации ассетов', error)
      } finally {
        setLoading(false)
      }

      const canvas = canvasRef.current
      window.addEventListener('dblclick', handleWindowDoubleClick)

      if (!canvas) {
        return
      }

      game = new Game(canvas)
      game.start()
    }

    init()

    return () => {
      game?.stop()
      window.removeEventListener('dblclick', handleWindowDoubleClick)
    }
  }, [])
  // TODO: Вывод прогресса загрузки
  return (
    <Layout variant="center" title="">
      {isLoading ? 'Loading' : ''}
      <canvas className={s.canvas} ref={canvasRef} />
    </Layout>
  )
}
