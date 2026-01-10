import { BaseUnit } from './BaseUnit'
import { EventBus } from '../../EventBus'
import { MobEvents, GameEvents } from '../../types'
import { MobStates, Position, UnitInit } from './types'

const VALID_ANGLES = [
  Math.PI / 4,
  Math.PI * (3 / 8),
  Math.PI * (5 / 8),
  Math.PI * (3 / 4),
]
const COLLISION_SIDE_PADDING = 0.35
const COLLISION_FRONT_PADDING = 0.2

export function isMob(value: unknown): value is BaseMob {
  return value instanceof BaseMob
}

export abstract class BaseMob extends BaseUnit {
  protected abstract _name: string
  protected abstract _hp: string
  protected abstract _speed: number
  protected abstract _attackCooldown: number
  protected abstract _hitCooldown: number

  private _targetPoint: Position | null = null
  private _turnPoint: Position | null = null
  private _turnAngle: number | null = null

  private _timer = 0

  constructor(
    initProps: UnitInit,
    private _eventBus: EventBus<GameEvents>,
    private _targetUnit: BaseUnit
  ) {
    super(initProps)

    this.calculateTrajectory()
  }

  public get collisionSegment() {
    return {
      min: {
        x: this._position.x + COLLISION_SIDE_PADDING * this._size.width,
        y: this._position.y + (1 - COLLISION_FRONT_PADDING) * this._size.height,
      },
      max: {
        x: this._position.x + (1 - COLLISION_SIDE_PADDING) * this._size.width,
        y: this._position.y + (1 - COLLISION_FRONT_PADDING) * this._size.height,
      },
    }
  }

  private set _cooldownTimer(value: number) {
    this._timer = value > 0 ? value : 0
  }

  private get _cooldownTimer() {
    return this._timer
  }

  public getName(): string {
    return this._name
  }

  public isDead(): boolean {
    return this._hp.length === 0
  }

  public getHp(): string {
    return this._hp
  }

  public dicreaseHp(value = 1): void {
    this._hp = this._hp.slice(value)
  }

  public update(delta: number): void {
    this._updateUnitState()
    this._act(delta)
    this._updateActionProgress(delta)
    this._updateAttackCooldown(delta)
  }

  public isUnitNearHero(): boolean {
    return (
      this._position.x === this._targetPoint?.x &&
      this._position.y === this._targetPoint?.y
    )
  }

  public calculateTrajectory(): void {
    this._targetPoint = this._getTargetPoint()
    this._turnAngle = this._getAngleToTarget()
    this._turnPoint = this._getTurnPoint()
  }

  private _updateUnitState(): void {
    if (this.isUnitNearHero()) {
      this._tryAttack()
      return
    }
  }

  protected _tryAttack(): void {
    if (!this._canDealDamage() || this._targetUnit.isDead()) {
      return
    }

    this.setActionProgress(0)
    this._cooldownTimer = this._attackCooldown
    this.setState(MobStates.Attack)

    this.actionEmitPromise().then(() => {
      this._eventBus.emit(MobEvents.Attacks, this)
    })

    this.actionPromise().then(() => {
      this.setState(MobStates.Idle)
    })
  }

  protected _updateAttackCooldown(delta: number) {
    this._cooldownTimer = this._cooldownTimer - delta
  }

  private _act(delta: number): void {
    switch (this._state) {
      case MobStates.Walk: {
        this._moveToTarget(delta)
        /* this.setState(MobStates.Idle) */
        break
      }
      case MobStates.Attack: {
        this._tryAttack()
        break
      }
      case MobStates.Death: {
        break
      }
      case MobStates.Hit: {
        break
      }
      case MobStates.Idle: {
        break
      }
    }
  }

  private _canDealDamage(): boolean {
    return this._state !== MobStates.Death && this._cooldownTimer === 0
  }

  private _moveToTarget(delta: number): void {
    if (!this._targetPoint || this.isUnitNearHero()) {
      return
    }

    let target = this._targetPoint // По умолчанию цель - точка на таргетбоксе

    if (this._turnPoint !== null) {
      target = this._turnPoint // Если точка поворота есть, движемся к ней
    }

    // Расстояние до цели
    const deltaX = target.x - this._position.x
    const deltaY = target.y - this._position.y
    const distanceToTarget = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    // Если расстояние до цели меньше, чем пройденное за этот шаг, достигли цели
    if (distanceToTarget < this._speed * delta) {
      this._position = target // Перемещаем юнита в точку цели
      if (this._turnPoint !== null && this._turnAngle !== null) {
        // Если это точка поворота, обновляем угол и начинаем движение по новому направлению
        this._angle = this._turnAngle // Обновляем угол
        this._turnPoint = null
        this._turnAngle = null
      }
      // Если точка поворота не была задана, двигаемся к таргету
    } else {
      // Если не достигли цели, продолжаем движение
      const angle = Math.atan2(deltaY, deltaX)
      const moveX = Math.cos(angle) * this._speed * delta
      const moveY = Math.sin(angle) * this._speed * delta
      this._position.x += moveX
      this._position.y += moveY
    }
  }

  private _getTargetPoint(): Position {
    const targetCollisionSegment = this._targetUnit.collisionSegment

    const collisiumPoint = { x: 0, y: 0 }
    const shiftVector = { x: 0, y: 0 }
    // Найдем кратчайший вектор для столкновения объектов
    if (this.collisionSegment.max.x < targetCollisionSegment.min.x) {
      // Если объект слева от цели, то ближайшая точка имеет координаты левого конца отрезка
      collisiumPoint.x = targetCollisionSegment.min.x
      collisiumPoint.y = targetCollisionSegment.min.y

      shiftVector.x = -(1 - COLLISION_SIDE_PADDING) * this._size.width
      shiftVector.y = -(1 - COLLISION_FRONT_PADDING) * this._size.height
    } else if (this.collisionSegment.min.x > targetCollisionSegment.max.x) {
      // Если объект справа от цели
      collisiumPoint.x = targetCollisionSegment.max.x
      collisiumPoint.y = targetCollisionSegment.max.y

      shiftVector.x = 0
      shiftVector.y = -(1 - COLLISION_FRONT_PADDING) * this._size.height
    } else {
      collisiumPoint.x = this._position.x
      collisiumPoint.y = targetCollisionSegment.max.y

      shiftVector.x = 0
      shiftVector.y = -(1 - COLLISION_FRONT_PADDING) * this._size.height
    }

    return {
      x: collisiumPoint.x + shiftVector.x,
      y: collisiumPoint.y + shiftVector.y,
    }
  }

  private _getTurnPoint(): Position | null {
    if (!this._targetPoint || !this._turnAngle) {
      return null
    }

    const nearestX = this._targetPoint.x
    const nearestY = this._targetPoint.y

    const deltaX = this._position.x - nearestX

    const deltaY =
      deltaX < 0
        ? Math.tan(Math.PI - this._turnAngle) * deltaX
        : deltaX > 0
        ? Math.tan(this._turnAngle) * deltaX
        : 0

    const turnPointX = this._position.x
    const turnPointY = nearestY - deltaY

    return { x: turnPointX, y: turnPointY }
  }

  private _getAngleToTarget(): number | null {
    if (!this._targetPoint) {
      return null
    }

    const deltaX = this._targetPoint.x - this._position.x

    if (deltaX === 0) {
      return null
    }

    if (deltaX > 0) {
      const angleIndex = Math.round(Math.random()) // Индексы 0 и 1
      return VALID_ANGLES[angleIndex]
    }

    const angleIndex = Math.round(Math.random()) + 2 // Индексы 2 и 3

    return VALID_ANGLES[angleIndex]
  }
}
