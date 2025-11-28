import { ViewModel } from '../lib/ViewModel'
import background from '/sprites/background-with-wall.png'

type GameOptions = {
  onStart?: () => void
  onEnd?: (score: number) => void
}

export class Game {
  private _ctx: CanvasRenderingContext2D
  private _viewModel: ViewModel
  private _background = new Image()

  private _running = false
  private _lastTime = 0
  private _dpr = window.devicePixelRatio

  constructor(
    private _canvas: HTMLCanvasElement,
    private _options: GameOptions = {}
  ) {
    const ctx = _canvas.getContext('2d')

    if (!ctx) {
      throw new Error('Ctx is required')
    }

    this._ctx = ctx
    window.addEventListener('resize', this._resize)
    this._resize()

    this._background.src = background
    this._viewModel = new ViewModel(_canvas)

    this._viewModel.on('end', this._handleEnd)
  }

  onKey = (e: KeyboardEvent) => {
    this._viewModel.onKey(e.key)
  }

  start() {
    this._running = true
    this._lastTime = performance.now()
    this._canvas.focus()
    window.addEventListener('keyup', this.onKey)
    this._options.onStart?.()
    requestAnimationFrame(this._loop)
  }

  stop() {
    this._running = false
    window.removeEventListener('resize', this._resize)
    window.removeEventListener('keyup', this.onKey)
    this._viewModel.off('end', this._handleEnd)
  }

  private _handleEnd = (score: unknown) => {
    if (typeof score !== 'number') {
      return
    }

    this.stop()
    this._options.onEnd?.(score)
  }

  private _loop = (time: number) => {
    if (!this._running) {
      return
    }

    const delta = (time - this._lastTime) / 1000
    this._lastTime = time

    this._viewModel.update(delta)

    this._render()

    requestAnimationFrame(this._loop)
  }

  private _resize = () => {
    const parent = this._canvas.parentElement
    if (!parent) return

    const w = parent.clientWidth
    const h = parent.clientHeight

    this._canvas.width = w * this._dpr
    this._canvas.height = h * this._dpr

    this._ctx.setTransform(this._dpr, 0, 0, this._dpr, 0, 0)
  }

  private _render() {
    const ctx = this._ctx
    const w = this._canvas.width / this._dpr
    const h = this._canvas.height / this._dpr

    ctx.clearRect(0, 0, w, h)

    if (this._background.complete) {
      ctx.drawImage(this._background, 0, 0, w, h)
    }

    this._viewModel.renderUnits(ctx)
  }
}
