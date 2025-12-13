export const enum BaseEvents {
  Start = 'start',
  Pause = 'pause',
  End = 'end',
}

export const enum MobEvents {
  Death = 'mob_death',
  Attacks = 'mob_attacks',
  GetHit = 'mob_get_hit',
  StartsWalking = 'mob_starts_walking',
}

export const enum HeroEvents {
  DeathBow = 'hero_death_bow',
  HitBow = 'hero_hit_bow',
  AttacksRange = 'hero_attacks_range',
  AttacksMelee = 'hero_attacks_melee',
  SwapWeaponToRange = 'hero_swap_weapon_range',
  SwapWeaponToMelee = 'hero_swap_weapon_melee',
}

export const enum ProjectileEvents {
  Launched = 'projectile_launched',
  Landed = 'projectile_landed',
}

export const enum ScenarioEvents {
  EnemiesSpawned = 'enemies_spawned',
  EnemiesDefeated = 'enemies_defeated',
}

export type GameEvents =
  | BaseEvents
  | ScenarioEvents
  | HeroEvents
  | MobEvents
  | ProjectileEvents
