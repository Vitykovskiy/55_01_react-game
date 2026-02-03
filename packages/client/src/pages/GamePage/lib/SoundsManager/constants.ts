export const SOUNDS_ASSETS = import.meta.glob('@assets/sounds/*.mp3', {
  as: 'url',
}) as Record<string, () => Promise<string>>

export enum SoundsKeys {
  OrcDeath01 = 'orc_death_1',
  OrcDeath02 = 'orc_death_2',
  ArrowCast = 'arrow_cast',
  ArrowHit = 'arrow_hit',
  ArrowShoot = 'arrow_shoot',
}
