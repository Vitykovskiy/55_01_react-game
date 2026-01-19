import {
  Position,
  Size,
  StatePropertiesMap,
  UnitInit,
  UnitState,
} from './types'

export abstract class BaseUnit {
  protected _state: UnitState
  protected _position: Position
  protected _angle: number
  protected _size: Size

  protected _actionPromise: Promise<boolean> | null = null
  protected _actionEmitPromise: Promise<boolean> | null = null
  protected _actionResolver: ((value: boolean) => void) | null = null
  protected _actionEmitResolver: ((value: boolean) => void) | null = null
  protected _actionEmitResolveThreshold = 100

  private _progress = 0
  private _statePropertiesMap: StatePropertiesMap

  constructor({
    angle,
    position: { x, y },
    size: { width, height },
    state,
    actionsPropertiesMap,
  }: UnitInit) {
    this._angle = angle
    this._position = {
      x: x,
      y: y,
    }
    this._size = {
      width,
      height,
    }

    this._state = state
    this._statePropertiesMap = actionsPropertiesMap
  }

  public abstract get collisionSegment(): { min: Position; max: Position }

  protected get _centerPoint() {
    return {
      x: this._position.x + this.getSize().width / 2,
      y: this._position.y + this.getSize().height / 2,
    }
  }

  protected set _centerPoint({ x, y }: Position) {
    this._position.x = x - this.getSize().width / 2
    this._position.y = y - this.getSize().height / 2
  }

  private set _actionProgress(value: number) {
    this._progress = value
  }

  private get _actionProgress() {
    return this._stateProperties.isLoop
      ? this._progress % 100
      : this._progress < 100
      ? this._progress
      : 100
  }

  protected get _stateProperties() {
    const properties = this._statePropertiesMap.get(this._state)
    if (!properties) {
      throw new Error(`Не найдены свойства для состояния "${this._state}"`)
    }
    return properties
  }

  public abstract isDead(): boolean

  /* Резолвится при достижении предзаданного порога progressTriggerPoint*/
  public actionEmitPromise(): Promise<boolean> {
    if (this._actionEmitPromise) {
      return this._actionEmitPromise
    }

    this._actionEmitResolveThreshold =
      this._stateProperties.progressTriggerPoint ?? 100
    this._actionProgress = 0

    this._actionEmitPromise = new Promise(resolve => {
      this._actionEmitResolver = resolve
    })

    return this._actionEmitPromise
  }

  /* Резолвится при достижении 100% */
  public actionPromise(): Promise<boolean> {
    if (this._actionPromise) {
      return this._actionPromise
    }

    this._actionProgress = 0
    this._actionPromise = new Promise(resolve => {
      this._actionResolver = resolve
    })

    return this._actionPromise
  }

  public getAngle(): number {
    return this._angle
  }

  public getActionProgress(): number {
    return this._actionProgress
  }

  public setActionProgress(value: number): void {
    this._actionProgress = value
  }

  public getSize(): Size {
    return { ...this._size }
  }

  public getPosition(): Position {
    return { ...this._position }
  }

  public setPosition({ x, y }: Position): void {
    this._position = {
      x: x,
      y: y,
    }
  }

  public getState(): UnitState {
    return this._state
  }

  public setState(state: UnitState): void {
    this._state = state
  }

  public update(delta: number): void {
    this._updateActionProgress(delta)
  }

  public breakCurrentAction(): void {
    if (!this._stateProperties.isBreakable) {
      return
    }

    if (this._actionResolver) {
      this._actionResolver(false)
    }
    if (this._actionEmitResolver) {
      this._actionEmitResolver(false)
    }
    this._actionResolver = null
    this._actionEmitResolver = null
    this._actionPromise = null
    this._actionEmitPromise = null
    this._actionEmitResolveThreshold = 100
    this._actionProgress = 0
  }

  protected _updateActionProgress(delta: number): void {
    const { duration } = this._stateProperties

    this._actionProgress = this._actionProgress + (delta / duration) * 100
    this._checkActionProgress()
  }

  private _checkActionProgress() {
    if (
      this._actionEmitResolver &&
      this._actionProgress >= this._actionEmitResolveThreshold
    ) {
      this._actionEmitResolver(true)
      this._actionEmitResolver = null
      this._actionEmitPromise = null
      this._actionEmitResolveThreshold = 100
    }

    if (this._actionResolver && this._actionProgress >= 100) {
      this._actionResolver(true)
      this._actionResolver = null
      this._actionPromise = null
      this._actionProgress = 0
    }
  }
}
