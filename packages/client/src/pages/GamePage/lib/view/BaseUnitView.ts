import { Unit } from '../../models/types'
import { UnitAnimationsManager } from '../AssetsManager/UnitAnimationsManager'
import { UnitStates, UnitViewState } from './types'

export const DEFAULT_DEATH_ANIMATION_DURATION_MS = 1500
export const DEFAULT_ATTACK_ANIMATION_DURATION_MS = 600

export abstract class BaseUnitView {
  private _viewState: UnitViewState
  private _animator: number | null = null // Таймер анимации
  private _progress = 0

  protected abstract _unitAnimationsManager: UnitAnimationsManager

  constructor(defaultState: UnitViewState) {
    this._viewState = defaultState
    this.startAnimationLoop()
  }

  private set _animationProgress(value: number) {
    this._progress = value === 0 ? 0 : value % 100
  }

  private get _animationProgress(): number {
    return this._progress
  }

  protected setViewState(state: Partial<UnitViewState>): void {
    Object.assign(this._viewState, state)
  }

  render(context: CanvasRenderingContext2D, unit: Unit) {
    const { x, y } = unit.getPosition()
    const { width, height } = unit.getSize()
    const name = unit.getName()
    const hp = unit.getHp()
    const text = name.slice(name.length - hp)

    const image = this._unitAnimationsManager.getFrame(
      this._viewState.state,
      this._viewState.angle,
      this._animationProgress
    )

    if (image) {
      context.drawImage(image, x, y, width, height)
    }

    context.font = '14px Arial'
    context.textAlign = 'center'
    context.textBaseline = 'middle'

    const fullTextWidth = context.measureText(name).width
    const textHeight = 16

    const paddingX = 6
    const paddingY = 2

    const boxWidth = fullTextWidth + paddingX * 2
    const boxHeight = textHeight + paddingY * 2

    const boxX = x + width / 2 - boxWidth / 2
    const boxY = y - boxHeight - 4

    context.fillStyle = 'rgba(0,0,0,0.6)'
    context.fillRect(boxX, boxY, boxWidth, boxHeight)

    context.fillStyle = 'white'
    context.fillText(text, boxX + boxWidth / 2, boxY + boxHeight / 2)
  }

  async showDeath(): Promise<void> {
    this.setViewState({
      state: UnitStates.Death,
      duration: DEFAULT_DEATH_ANIMATION_DURATION_MS,
    })
    await this.showAnimationOnce()
  }

  async showAttack(): Promise<void> {
    this.setViewState({
      state: UnitStates.Attack,
      duration: DEFAULT_ATTACK_ANIMATION_DURATION_MS,
    })
    await this.showAnimationOnce()
  }

  showIddle(): void {
    this.setViewState({
      state: UnitStates.Idle,
      duration: DEFAULT_DEATH_ANIMATION_DURATION_MS,
    })
    this.startAnimationLoop()
  }

  protected startAnimationLoop(): void {
    const startTime = performance.now()

    const updateAnimation = () => {
      const step = performance.now() - startTime

      this._animationProgress = (step / this._viewState.duration) * 100
      requestAnimationFrame(updateAnimation)
    }

    this._animator = requestAnimationFrame(updateAnimation)
  }

  stopAnimation(): void {
    if (this._animator !== null) {
      cancelAnimationFrame(this._animator)
      this._animator = null
    }
  }

  protected showAnimationOnce(): Promise<void> {
    this.stopAnimation()

    return new Promise(resolve => {
      const startTime = performance.now()

      const updateAnimation = () => {
        const step = performance.now() - startTime

        const progress = (step / this._viewState.duration) * 100

        if (progress >= 100) {
          this._animationProgress = 100
          resolve()
        } else {
          this._animationProgress = progress
          requestAnimationFrame(updateAnimation)
        }
      }

      requestAnimationFrame(updateAnimation)
    })
  }
}
