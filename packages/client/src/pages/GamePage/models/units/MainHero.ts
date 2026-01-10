import { BaseUnit } from './base/BaseUnit'
import { DEFAULT_SIZE_UNIT } from '../consts'
import {
  StatePropertiesMap,
  MainHeroStates,
  UnitState,
  Position,
} from './base/types'

const COLLISION_SIDE_PADDING = 0.45
const COLLISION_FRONT_PADDING = 0.2
const MAIN_HERO_MAX_HP = 10
const MAIN_HERO_ANIMATIONS: StatePropertiesMap = new Map([
  [MainHeroStates.IdleBow, { duration: 1200, isBreakable: true, isLoop: true }],
  [MainHeroStates.AttackBow, { duration: 400, progressTriggerPoint: 70 }],
  [MainHeroStates.DeathBow, { duration: 1300 }],
  [
    MainHeroStates.HitBow,
    { duration: 400, progressTriggerPoint: 90, isBreakable: true },
  ],
])

const BREAKABLE_STATES: UnitState[] = [
  MainHeroStates.HitBow,
  MainHeroStates.IdleBow,
]

export function isMainHero(value: unknown): value is MainHero {
  return value instanceof MainHero
}

export class MainHero extends BaseUnit {
  private _hp: number

  constructor(position: Position) {
    super({
      position,
      angle: -Math.PI / 2,
      size: { width: DEFAULT_SIZE_UNIT, height: DEFAULT_SIZE_UNIT },
      state: MainHeroStates.IdleBow,
      actionsPropertiesMap: MAIN_HERO_ANIMATIONS,
    })

    this._hp = MAIN_HERO_MAX_HP
  }

  public get collisionSegment() {
    return {
      min: {
        x: this._position.x + COLLISION_SIDE_PADDING * this._size.width,
        y: this._position.y + COLLISION_FRONT_PADDING * this._size.height,
      },
      max: {
        x: this._position.x + (1 - COLLISION_SIDE_PADDING) * this._size.width,
        y: this._position.y + COLLISION_FRONT_PADDING * this._size.height,
      },
    }
  }

  public decreaseHP(value = 1): void {
    this._hp = this._hp - value || 0
  }

  public isDead(): boolean {
    return this._hp <= 0
  }

  public onHit(): void {
    this.decreaseHP()

    if (this.isDead()) {
      this.onDeath()
      return
    }

    if (BREAKABLE_STATES.includes(this._state)) {
      this.breakCurrentAction()
    }

    this.setState(MainHeroStates.HitBow)
    this.actionPromise().then(value => {
      if (!value || this.isDead()) {
        return
      }
      this.setState(MainHeroStates.IdleBow)
    })
  }

  public onDeath(): void {
    this.breakCurrentAction()
    this.setState(MainHeroStates.DeathBow)
  }
}
