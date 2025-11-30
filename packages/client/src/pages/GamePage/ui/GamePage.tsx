import Layout from '@shared/ui/Layout'
import { useEffect, useRef, useState } from 'react'
import s from './GamePage.module.scss'
import { initAssets } from '@pages/GamePage/lib/AssetsManager/assets'
import { Game } from './Game'

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

      if (!canvas) {
        return
      }

      game = new Game(canvas)
      game.start()
    }

    init()

    return () => {
      game?.stop()
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
