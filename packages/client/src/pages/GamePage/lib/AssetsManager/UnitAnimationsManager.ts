import { SpriteAnimation } from './SpriteAnimation'
import { MainHeroStates, UnitStates } from '../view/types'
import {
  UnitAnimations,
  InitialAnimationPropsMap,
  StateAnimations,
  Angle,
  FramesModes,
} from './types'

export class UnitAnimationsManager {
  private _map: UnitAnimations = new Map<
    UnitStates | MainHeroStates,
    StateAnimations
  >()

  constructor(private _spriteSheets: Record<string, string>) {}

  public async generateAnimationMap(
    animationsPropsMap: InitialAnimationPropsMap
  ): Promise<void> {
    const states = Array.from(animationsPropsMap.entries())

    for (const [state, animationProps] of states) {
      const {
        src,
        parts,
        angles,
        columns,
        rows,
        scale: scale,
        mode,
      } = animationProps

      const angleEntries = await Promise.all(
        angles.map(async angle => {
          const angleStr = angle.toString().padStart(3, '0') // Углы в именах ассетов всегда имеют 3 символа

          const source =
            mode === FramesModes.Frames
              ? `${src}/${parts[0]}/${angleStr}`
              : `${src}/${src}_${parts[0]}_${angleStr}.png`

          const animationFrames = new SpriteAnimation({
            source,
            columns,
            rows,
            scale: scale,
            mode,
            spriteSheets: this._spriteSheets,
          })

          await animationFrames.init()

          return [angle, animationFrames] as const
        })
      )

      this._map.set(state, new Map(angleEntries))
    }
  }

  public getFrame(
    state: UnitStates | MainHeroStates,
    angle: Angle,
    frameIndex: number
  ): ImageBitmap {
    const frame = this._map.get(state)?.get(angle)?.getFrame(frameIndex)

    if (!frame) {
      throw new Error('Кадр не найден')
    }

    return frame
  }
}
