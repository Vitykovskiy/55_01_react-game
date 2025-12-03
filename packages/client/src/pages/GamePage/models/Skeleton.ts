import { BaseUnit, EnemyMovement } from './BaseUnit'

const SKELETON_SIZE_PX = 120

export class Skeleton extends BaseUnit {
  override movement = new EnemyMovement()

  constructor(x: number, y: number, name: string) {
    super({
      name: name,
      position: { x, y },
      damage: 1,
      size: { width: SKELETON_SIZE_PX, height: SKELETON_SIZE_PX },
    })
  }
}
