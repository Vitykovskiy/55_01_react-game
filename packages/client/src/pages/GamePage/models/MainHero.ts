import { BaseUnit, NotMovement } from './BaseUnit'
import { DEFAULT_SIZE_UNIT } from './consts'

export class MainHero extends BaseUnit {
  override movement = new NotMovement()

  constructor(x: number, y: number) {
    super({
      name: 'MainHero',
      position: { x, y },
      damage: 1,
      size: { width: DEFAULT_SIZE_UNIT, height: DEFAULT_SIZE_UNIT },
    })
  }
}
