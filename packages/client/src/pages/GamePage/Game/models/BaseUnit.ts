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
  name: string
  position: Position
  hp: number
  damage: number
  damageCooldown = 2
  private damageTimer = 0
  size: Size

  abstract movement?: MovementStrategy

  constructor({
    name,
    position: { x, y },
    damage,
    size: { width, height },
  }: UnitInit) {
    this.name = name
    this.position = {
      x: x,
      y: y,
    }
    this.size = {
      width,
      height,
    }
    this.hp = name.length
    this.damage = damage
  }

  getPosition(): Position {
    return {
      x: this.position.x,
      y: this.position.y,
    }
  }

  isDead = () => {
    return this.hp === 0
  }

  getHp = () => {
    return this.hp
  }

  getDamage = (): number => {
    return this.damage
  }

  applyDamage = (damage: number) => {
    console.log(this.hp)
    if (this.hp < damage) {
      this.hp = 0
      return
    }

    this.hp -= damage
  }

  setPosition({ x, y }: Position): void {
    this.position = {
      x: x,
      y: y,
    }
  }

  canDealDamage(): boolean {
    return (
      this.movement instanceof NotMovement &&
      this.damageTimer >= this.damageCooldown
    )
  }

  resetDamageTimer() {
    this.damageTimer = 0
  }

  update(delta: number) {
    this.movement?.update(this, delta)
    if (this.damageTimer < this.damageCooldown) {
      this.damageTimer += delta
    }
  }

  stop() {
    if (this.movement instanceof NotMovement) {
      return
    }

    this.movement = new NotMovement()
  }
}
