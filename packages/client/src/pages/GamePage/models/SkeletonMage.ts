import { BaseUnit, EnemyMovement } from './BaseUnit'
import { DEFAULT_SIZE_UNIT } from './consts'

export class SkeletonMage extends BaseUnit {
  override movement = new EnemyMovement()

  constructor(x: number, y: number, name: string) {
    super({
      name: name,
      position: { x, y },
      damage: 2,
      size: { width: DEFAULT_SIZE_UNIT, height: DEFAULT_SIZE_UNIT },
    })
  }
}
