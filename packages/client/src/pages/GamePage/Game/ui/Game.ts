import { ViewModel } from '../presenter/ViewModel'
import background from '/sprites/background-with-wall.png'

export class Game {
  private ctx: CanvasRenderingContext2D
  private viewModel: ViewModel
  private background = new Image()

  private running = false
  private lastTime = 0
  private dpr = window.devicePixelRatio

  constructor(private canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Ctx is required')
    }

    this.ctx = ctx
    this.viewModel = new ViewModel(canvas)

    this.background.src = background

    window.addEventListener('resize', this.resize)
    this.resize()

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
    requestAnimationFrame(this.loop)
  }

  stop() {
    this.running = false
    window.removeEventListener('resize', this.resize)
    window.removeEventListener('keyup', this.onKey)
  }

  private loop = (time: number) => {
    if (!this.running) return

    const delta = (time - this.lastTime) / 1000
    this.lastTime = time

    this.viewModel.update(delta)

    this.render()

    requestAnimationFrame(this.loop)
  }

  private resize = () => {
    const parent = this.canvas.parentElement
    if (!parent) return

    const w = parent.clientWidth
    const h = parent.clientHeight

    this.canvas.width = w * this.dpr
    this.canvas.height = h * this.dpr

    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
  }

  render() {
    const ctx = this.ctx
    const w = this.canvas.width / this.dpr
    const h = this.canvas.height / this.dpr

    ctx.clearRect(0, 0, w, h)

    if (this.background.complete) {
      ctx.drawImage(this.background, 0, 0, w, h)
    }

    this.viewModel.renderUnits(ctx)
  }
}
