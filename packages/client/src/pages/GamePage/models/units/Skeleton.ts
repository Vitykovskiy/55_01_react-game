import { EventBus } from '../EventBus'
import { MobEvents } from '../types'
import { BaseMob } from './base/BaseMob'
import { BaseUnit } from './base/BaseUnit'
import { MobStates, Position, StatePropertiesMap } from './base/types'

const SKELETON_SIZE_PX = 120

const SKELETON_ACTIONS_PROPS: StatePropertiesMap = new Map([
  [MobStates.Walk, { duration: 1200, isBreakable: true, isLoop: true }],
  [MobStates.Attack, { duration: 1100, progressTriggerPoint: 45 }],
  [MobStates.Death, { duration: 1500, progressTriggerPoint: 100 }],
  [MobStates.Idle, { duration: 1200, isBreakable: true, isLoop: true }],
])

export class Skeleton extends BaseMob {
  protected _hp: string
  protected _name: string
  protected _speed = 50 / 1000
  protected _attackCooldown = 1400
  protected _hitCooldown = 500

  constructor(
    name: string,
    position: Position,
    targetUnit: BaseUnit,
    eventBus: EventBus<MobEvents>
  ) {
    super(
      {
        position,
        angle: Math.PI / 2,
        size: { width: SKELETON_SIZE_PX, height: SKELETON_SIZE_PX },
        state: MobStates.Walk,
        actionsPropertiesMap: SKELETON_ACTIONS_PROPS,
      },
      eventBus,
      targetUnit
    )
    this._name = name
    this._hp = name
  }
}
