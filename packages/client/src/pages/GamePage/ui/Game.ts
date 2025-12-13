import { ViewModel } from '../lib/ViewModel'
import { GameDirector } from '../models/GameDirector'
import { BaseEvents } from '../models/types'
import background from '/sprites/background-with-wall.png'

const ASPECT_RATIO_WIDTH = 9
const ASPECT_RATIO_HEIGHT = 16

export class Game {
  private readonly _context: CanvasRenderingContext2D
  private readonly _background = new Image()
  private readonly _gameDirector: GameDirector
  private readonly _viewModel: ViewModel

  private running = false
  private lastTime = 0
  private dpr = window.devicePixelRatio

  constructor(private readonly canvas: HTMLCanvasElement) {
    const context = canvas.getContext('2d')

    if (!context) {
      throw new Error('CanvasRenderingContext2D is required')
    }

    this._context = context
    this._background.src = background
    const { width, height } = canvas

    const parentElement = this.canvas.parentElement
    if (parentElement) {
      parentElement.addEventListener('resize', this._resize)
    }

    this._resize()

    this._gameDirector = new GameDirector({ width, height })
    this._viewModel = new ViewModel()

    this._gameDirector.eventBus.on(BaseEvents.End, () => {
      this.stop()
    })
  }

  public start() {
    this.running = true
    this.lastTime = performance.now()
    this.canvas.focus()
    window.addEventListener('keyup', this._onKey)
    requestAnimationFrame(this._loop)
  }

  public stop() {
    this.running = false
    const parentElement = this.canvas.parentElement
    if (parentElement) {
      parentElement.removeEventListener('resize', this._resize)
    }
    window.removeEventListener('resize', this._resize)
    window.removeEventListener('keyup', this._onKey)
  }

  private _loop = (time: number) => {
    if (!this.running) {
      return
    }

    const delta = time - this.lastTime
    this.lastTime = time

    this._gameDirector.update(delta)
    this._render()

    requestAnimationFrame(this._loop)
  }

  private _render(): void {
    this._renderBackground()
    this._renderModels()
  }

  private _renderBackground(): void {
    const w = this.canvas.width / this.dpr
    const h = this.canvas.height / this.dpr

    this._context.clearRect(0, 0, w, h)

    if (this._background.complete) {
      this._context.drawImage(this._background, 0, 0, w, h)
    }
  }

  private _resize = () => {
    const parent = this.canvas.parentElement
    if (!parent) {
      return
    }

    const w = parent.getBoundingClientRect().width
    const h = (w * ASPECT_RATIO_HEIGHT) / ASPECT_RATIO_WIDTH

    this.canvas.width = w * this.dpr
    this.canvas.height = h * this.dpr

    this._context.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)
  }

  private _onKey = (e: KeyboardEvent) => {
    this._gameDirector.onKey(e.key)
  }

  private _renderModels(): void {
    this._viewModel.render(this._context)
  }
}
