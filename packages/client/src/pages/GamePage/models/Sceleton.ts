import { BaseUnit, EnemyMovement } from './BaseUnit'

const SCELETON_SIZE_PX = 120

export class Sceleton extends BaseUnit {
  override movement = new EnemyMovement()

  constructor(x: number, y: number, name: string) {
    super({
      name: name,
      position: { x, y },
      damage: 1,
      size: { width: SCELETON_SIZE_PX, height: SCELETON_SIZE_PX },
    })
  }
}
