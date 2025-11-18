import { Position, Size, Unit } from './types'

interface UnitInit {
  name: string
  position: Position
  damage: number
  size: Size
}

export interface MovementStrategy {
  update(unit: BaseUnit, delta: number): void
}

export class EnemyMovement implements MovementStrategy {
  update(unit: BaseUnit, delta: number) {
    const speed = 50
    const pos = unit.getPosition()
    unit.setPosition({ x: pos.x, y: pos.y + speed * delta })
  }
}

export class NotMovement implements MovementStrategy {
  update() {
    return
  }
}

export abstract class BaseUnit implements Unit {
  private _name: string
  private _position: Position
  private _hp: number
  private _damage: number
  private _damageCooldown = 2
  private _damageTimer = 0
  private _size: Size

  abstract movement?: MovementStrategy

  constructor({
    name,
    position: { x, y },
    damage,
    size: { width, height },
  }: UnitInit) {
    this._name = name
    this._position = {
      x: x,
      y: y,
    }
    this._size = {
      width,
      height,
    }
    this._hp = name.length
    this._damage = damage
  }

  getSize = () => {
    return { ...this._size }
  }

  getName = () => {
    return this._name
  }

  getPosition(): Position {
    return { ...this._position }
  }

  isDead = () => {
    return this._hp === 0
  }

  getHp = () => {
    return this._hp
  }

  getDamage = (): number => {
    return this._damage
  }

  applyDamage = (damage: number) => {
    if (this._hp < damage) {
      this._hp = 0
      return
    }

    this._hp -= damage
    this._resetDamageTimer()
  }

  setPosition({ x, y }: Position): void {
    this._position = {
      x: x,
      y: y,
    }
  }

  tryDealDamage(unit: Unit) {
    if (!this._canDealDamage()) {
      return
    }

    this._resetDamageTimer()

    unit.applyDamage(this.getDamage())
  }

  update = (delta: number) => {
    this.movement?.update(this, delta)
    if (this._damageTimer < this._damageCooldown) {
      this._damageTimer += delta
    }
  }

  stop = () => {
    if (this.movement instanceof NotMovement) {
      return
    }

    this.movement = new NotMovement()
  }

  private _canDealDamage(): boolean {
    return (
      this.movement instanceof NotMovement &&
      this._damageTimer >= this._damageCooldown
    )
  }

  private _resetDamageTimer = () => {
    this._damageTimer = 0
  }
}
