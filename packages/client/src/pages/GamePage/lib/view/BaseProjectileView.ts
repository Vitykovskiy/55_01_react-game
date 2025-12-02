import { Position } from '../../models/types'

export abstract class BaseProjectileView {
  protected _angle: number
  private _position: Position
  private _target: Position
  private _distance!: number

  protected abstract _size: { width: number; height: number }
  protected abstract _image: ImageBitmap | null
  protected abstract _speed: number

  constructor(from: Position, to: Position) {
    this._position = { ...from }
    this._target = { ...to }

    // Для корректной отрисовки нужно определить угол и дистанцию полета
    this._angle = Math.atan2(to.y - from.y, to.x - from.x)

    const diffX = this._target.x - this._position.x
    const diffY = this._target.y - this._position.y
    this._distance = Math.sqrt(diffX ** 2 + diffY ** 2)
  }

  async start(): Promise<void> {
    const flyTime = (this._distance / this._speed) * 1000

    return new Promise(resolve => {
      setTimeout(() => {
        this._image = null
        resolve()
      }, flyTime)
    })
  }

  update(delta: number): void {
    if (
      this._position.x === this._target.x &&
      this._position.y === this._target.y
    ) {
      return
    }

    const diffX = this._target.x - this._position.x
    const diffY = this._target.y - this._position.y
    this._distance = Math.sqrt(diffX ** 2 + diffY ** 2)

    if (this._distance === 0) {
      return
    }

    const travelDistance = this._speed * delta

    if (travelDistance >= this._distance) {
      this._position = { ...this._target }
      return
    }

    const normX = diffX / this._distance
    const normY = diffY / this._distance

    this._position = {
      x: this._position.x + normX * travelDistance,
      y: this._position.y + normY * travelDistance,
    }
  }

  render(context: CanvasRenderingContext2D): void {
    if (!this._image) {
      return
    }

    const { width, height } = this._size
    const { x, y } = this._position

    context.save()
    context.translate(x + width / 2, y + height / 2)
    context.rotate(this._angle + Math.PI / 2)
    context.drawImage(this._image, -width / 2, -height / 2, width, height)

    context.restore()
  }
}
