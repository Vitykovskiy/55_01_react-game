import { AssetsManager } from '@pages/GamePage/lib/AssetsManager/AnimationsManager'
import {
  FramesModes,
  StateAnimationParamsMap,
} from '@pages/GamePage/lib/AssetsManager/types'
import {
  MainHeroStates,
  ProjectilesTypes,
  UnitStates,
  UnitsTypes,
} from '@pages/GamePage/lib/view/types'

const SPRITE_SHEETS = import.meta.glob('@assets/**/*.png', {
  eager: true,
  import: 'default',
}) as Record<string, string>

const MAIN_HERO_ALLOWED_ANGLES = [315, 337, 0, 22, 45]
const SCELETON_ALLOWED_ANGLES = [135, 157, 180, 202, 225]
const ORC_ALLOWED_ANGLES = [135, 157, 180, 202, 225]

const SCELETON_ANIMATIONS_MAP: StateAnimationParamsMap = new Map([
  [
    UnitStates.Walk,
    {
      src: 'Walk',
      parts: ['Body'],
      angles: SCELETON_ALLOWED_ANGLES,
      columns: 4,
      rows: 2,
      scale: 2,
    },
  ],
  [
    UnitStates.Attack,
    {
      src: 'Attack_01',
      parts: ['Body'],
      angles: SCELETON_ALLOWED_ANGLES,
      columns: 4,
      rows: 3,
      scale: 2,
    },
  ],
  [
    UnitStates.Death,
    {
      src: 'Death_from_Block',
      parts: ['Body'],
      angles: SCELETON_ALLOWED_ANGLES,
      columns: 4,
      rows: 4,
      scale: 2,
    },
  ],
  [
    UnitStates.Hit,
    {
      src: 'Hit',
      parts: ['Body'],
      angles: SCELETON_ALLOWED_ANGLES,
      columns: 3,
      rows: 2,
      scale: 2,
    },
  ],
  [
    UnitStates.Idle,
    {
      src: 'Idle_Simple',
      parts: ['Body'],
      angles: SCELETON_ALLOWED_ANGLES,
      columns: 4,
      rows: 3,
      scale: 2,
    },
  ],
])

const MAIN_HERO_ANIMATIONS_MAP: StateAnimationParamsMap = new Map([
  [
    MainHeroStates.DrawSword,
    {
      src: 'Draw_Sword',
      parts: ['Body'],
      angles: MAIN_HERO_ALLOWED_ANGLES,
      columns: 5,
      rows: 4,
      scale: 2,
    },
  ],
  [
    MainHeroStates.AttackSword,
    {
      src: 'Attack_Sword',
      parts: ['Body'],
      angles: MAIN_HERO_ALLOWED_ANGLES,
      columns: 6,
      rows: 4,
      scale: 2,
    },
  ],
  [
    MainHeroStates.DeathSword,
    {
      src: 'Death_Sword',
      parts: ['Body'],
      angles: MAIN_HERO_ALLOWED_ANGLES,
      columns: 6,
      rows: 5,
      scale: 2,
    },
  ],
  [
    MainHeroStates.HitSword,
    {
      src: 'Hit_Sword',
      parts: ['Body'],
      angles: MAIN_HERO_ALLOWED_ANGLES,
      columns: 4,
      rows: 4,
      scale: 2,
    },
  ],
  [
    MainHeroStates.IdleSword,
    {
      src: 'Idle_Sword',
      parts: ['Body'],
      angles: MAIN_HERO_ALLOWED_ANGLES,
      columns: 4,
      rows: 4,
      scale: 2,
    },
  ],
  [
    MainHeroStates.DrawBow,
    {
      src: 'Draw_Bow',
      parts: ['Body'],
      angles: MAIN_HERO_ALLOWED_ANGLES,
      columns: 5,
      rows: 4,
      scale: 2,
    },
  ],
  [
    MainHeroStates.AttackBow,
    {
      src: 'Attack_Bow',
      parts: ['Body'],
      angles: MAIN_HERO_ALLOWED_ANGLES,
      columns: 6,
      rows: 4,
      scale: 2,
    },
  ],
  [
    MainHeroStates.DeathBow,
    {
      src: 'Death_Bow',
      parts: ['Body'],
      angles: MAIN_HERO_ALLOWED_ANGLES,
      columns: 6,
      rows: 5,
      scale: 2,
    },
  ],
  [
    MainHeroStates.HitBow,
    {
      src: 'Hit_Bow',
      parts: ['Body'],
      angles: MAIN_HERO_ALLOWED_ANGLES,
      columns: 5,
      rows: 4,
      scale: 2,
    },
  ],
  [
    MainHeroStates.IdleBow,
    {
      src: 'Idle_Bow',
      parts: ['Body'],
      angles: MAIN_HERO_ALLOWED_ANGLES,
      columns: 4,
      rows: 4,
      scale: 2,
    },
  ],
])

const ORC_ANIMATIONS_MAP: StateAnimationParamsMap = new Map([
  [
    UnitStates.Walk,
    {
      src: 'orc/Walk_Armed',
      parts: ['Body'],
      angles: ORC_ALLOWED_ANGLES,
      columns: 1,
      rows: 1,
      scale: 2,
      mode: FramesModes.Frames,
    },
  ],
  [
    UnitStates.Attack,
    {
      src: 'orc/Attack_01',
      parts: ['Body'],
      angles: ORC_ALLOWED_ANGLES,
      columns: 1,
      rows: 1,
      scale: 2,
      mode: FramesModes.Frames,
    },
  ],
  [
    UnitStates.Death,
    {
      src: 'orc/Death_Armed',
      parts: ['Body'],
      angles: ORC_ALLOWED_ANGLES,
      columns: 1,
      rows: 1,
      scale: 2,
      mode: FramesModes.Frames,
    },
  ],
  [
    UnitStates.Hit,
    {
      src: 'orc/Hit_Armed',
      parts: ['Body'],
      angles: ORC_ALLOWED_ANGLES,
      columns: 1,
      rows: 1,
      scale: 2,
      mode: FramesModes.Frames,
    },
  ],
  [
    UnitStates.Idle,
    {
      src: 'orc/Idle_Armed',
      parts: ['Body'],
      angles: ORC_ALLOWED_ANGLES,
      columns: 1,
      rows: 1,
      scale: 2,
      mode: FramesModes.Frames,
    },
  ],
])

// В дев режиме useEffect запускается 2 раза. Избегаем дублирования
let initPromise: Promise<void> | null = null

export const assetsManager = new AssetsManager(SPRITE_SHEETS)

export const initAssets = async () => {
  if (initPromise) {
    return initPromise
  }

  initPromise = assetsManager.init(
    new Map([
      [UnitsTypes.MainHero, MAIN_HERO_ANIMATIONS_MAP],
      [UnitsTypes.Sceleton, SCELETON_ANIMATIONS_MAP],
      [UnitsTypes.Orc, ORC_ANIMATIONS_MAP],
    ]),
    new Map([[ProjectilesTypes.BowArrow, 'bow_arrow']])
  )

  return initPromise
}
