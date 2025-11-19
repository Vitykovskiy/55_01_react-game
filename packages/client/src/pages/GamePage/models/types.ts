export type Position = {
  x: number
  y: number
}

export type Size = {
  width: number
  height: number
}

export interface Unit {
  getHp(): number
  applyDamage(damage: number): void
  getDamage(): number
  setPosition(position: Position): void
  getPosition(): Position
  getSize(): Size
  getName(): string
  update(delta: number): void
  stop(): void
  tryDealDamage(unit: Unit): void
}
