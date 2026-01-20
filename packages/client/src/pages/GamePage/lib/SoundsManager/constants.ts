export const SOUNDS_ASSETS = import.meta.glob('@assets/sounds/*.mp3', {
  eager: true,
  as: 'url',
})

export const SOUNDS_MAP = {
  orc_death_01: 'orc_death_1.mp3',
  orc_death_02: 'orc_death_2.mp3',
  arrow_cast: 'arrow_cast.mp3',
  arrow_hit: 'arrow_hit.mp3',
  arrow_shoot: 'arrow_shoot.mp3',
}
