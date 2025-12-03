import { assetsManager } from '../lib/AssetsManager/assets'
import { ViewModel } from '../lib/ViewModel'
import background from '/sprites/background-with-wall.png'

export class Game {
  private readonly context: CanvasRenderingContext2D
  private readonly background = new Image()
  private readonly viewModel: ViewModel

  private running = false
  private lastTime = 0
  private dpr = window.devicePixelRatio

  constructor(private readonly canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error('CanvasRenderingContext2D is required')
    }

    this.context = context
    this.background.src = background

    window.addEventListener('resize', this._resize)
    this._resize()

    this.viewModel = new ViewModel(canvas, assetsManager)

    this.viewModel.on('end', () => {
      this.stop()
    })
  }

  onKey = (e: KeyboardEvent) => {
    this.viewModel.onKey(e.key)
  }

  start() {
    this.running = true
    this.lastTime = performance.now()
    this.canvas.focus()
    window.addEventListener('keyup', this.onKey)
    requestAnimationFrame(this._loop)
  }

  stop() {
    this.running = false
    window.removeEventListener('resize', this._resize)
    window.removeEventListener('keyup', this.onKey)
  }

  private _loop = (time: number) => {
    if (!this.running) {
      return
    }

    const delta = (time - this.lastTime) / 1000
    this.lastTime = time

    this.viewModel.update(delta)

    this._render()

    requestAnimationFrame(this._loop)
  }

  private _resize = () => {
    const parent = this.canvas.parentElement
    if (!parent) return

    const w = parent.clientWidth
    const h = parent.clientHeight

    this.canvas.width = w * this.dpr
    this.canvas.height = h * this.dpr

    this.context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
  }

  private _render() {
    const ctx = this.context
    const w = this.canvas.width / this.dpr
    const h = this.canvas.height / this.dpr

    ctx.clearRect(0, 0, w, h)

    if (this.background.complete) {
      ctx.drawImage(this.background, 0, 0, w, h)
    }

    this.viewModel.renderUnits(ctx)
  }
}
