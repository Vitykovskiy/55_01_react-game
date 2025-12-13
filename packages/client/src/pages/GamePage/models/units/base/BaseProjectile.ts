import { Position } from './types'

export abstract class BaseProjectile {
  protected _angle: number
  private _position: Position
  private _target: Position
  private _distance: number

  private _flyPromise: Promise<void> | null = null
  private _flyPromiseResolver: (() => void) | null = null

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

  public get position() {
    return this._position
  }

  public get angle() {
    return this._angle
  }

  public async launch(): Promise<void> {
    if (this._flyPromise) {
      return this._flyPromise
    }

    this._flyPromise = new Promise(resolve => {
      this._flyPromiseResolver = resolve
    })

    return this._flyPromise
  }

  public update(delta: number): void {
    if (
      this._position.x === this._target.x &&
      this._position.y === this._target.y
    ) {
      this._flyPromiseResolver?.()
      return
    }

    const diffX = this._target.x - this._position.x
    const diffY = this._target.y - this._position.y
    this._distance = Math.round(Math.sqrt(diffX ** 2 + diffY ** 2))

    if (this._distance === 0) {
      this._flyPromiseResolver?.()
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
}
