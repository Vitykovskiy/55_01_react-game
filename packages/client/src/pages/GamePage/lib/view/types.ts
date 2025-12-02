export interface UnitViewState {
  state: UnitStates | MainHeroStates
  angle: number
  duration: number
}

export const enum UnitsTypes {
  MainHero = 'main_hero',
  Skeleton = 'skeleton',
  Orc = 'orc',
}

export const enum ProjectilesTypes {
  BowArrow = 'bow_arrow',
}

export const enum UnitStates {
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
