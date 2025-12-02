import { MainHeroStates, UnitStates } from '../view/types'
import { SpriteAnimation } from './SpriteAnimation'

export type Angle = number

// Кадры могут храниться в виде листа кадров или каждый отдельным файлом
export const enum FramesModes {
  Sheet = 'sheet',
  Frames = 'frames',
}

export type UnitAnimations = Map<
  UnitStates | MainHeroStates,
  Map<Angle, SpriteAnimation>
>
export type StateAnimations = Map<Angle, SpriteAnimation>

export type UnitAnimationParamsMap = Map<string, StateAnimationParamsMap>
export type StateAnimationParamsMap = Map<
  UnitStates | MainHeroStates,
  AnimationParams
>
export type InitialAnimationPropsMap = StateAnimationParamsMap

export type ProjectilesParamsMap = Map<string, string> // Ключ и имя файла в assets/projectiles
export type ProjectilesMap = Map<string, ImageBitmap>

export interface AnimationParams {
  src: string
  parts: string[] // Могут быть варианты 'body' и 'shadow'
  angles: number[]
  columns: number
  rows: number
  scale?: number
  mode?: FramesModes
}

export interface SpriteAnimationProps {
  source: string
  columns: number
  rows: number
  scale?: number
  mode?: FramesModes
  spriteSheets: Record<string, string>
}
