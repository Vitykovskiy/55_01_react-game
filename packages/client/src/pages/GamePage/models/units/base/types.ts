export type UnitState = MobStates | MainHeroStates

export const enum MobStates {
  Walk = 'walk',
  Idle = 'idle',
  Hit = 'hit',
  Death = 'death',
  Attack = 'attack',
}

export const enum MainHeroStates {
  IdleSword = 'idle_sword',
  HitSword = 'hit_sword',
  DeathSword = 'death_sword',
  AttackSword = 'attack_sword',
  DrawSword = 'draw_sword',
  IdleBow = 'idle_bow',
  HitBow = 'hit_bow',
  DeathBow = 'death_bow',
  AttackBow = 'attack_bow',
  DrawBow = 'draw_bow',
}

export interface UnitInit {
  position: Position
  angle: number
  size: Size
  state: UnitState
  actionsPropertiesMap: StatePropertiesMap
}

export type StatePropertiesMap = Map<UnitState, StateProperties>

export type StateProperties = {
  duration: number
  progressTriggerPoint?: number
  isBreakable?: boolean
  isLoop?: boolean
}

export type Position = {
  x: number
  y: number
}

export type Size = {
  width: number
  height: number
}
