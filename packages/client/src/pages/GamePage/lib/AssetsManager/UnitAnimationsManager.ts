import { MobStates, MainHeroStates } from '../../models/units/base/types'
import { SpriteAnimation } from './SpriteAnimation'
import {
  UnitAnimations,
  InitialAnimationPropsMap,
  StateAnimations,
  Angle,
  FramesModes,
} from './types'

const ANGLE_STR_LENGTH = 3

export class UnitAnimationsManager {
  private _map: UnitAnimations = new Map<
    MobStates | MainHeroStates,
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
          const angleStr = angle.toString().padStart(ANGLE_STR_LENGTH, '0')

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
    state: MobStates | MainHeroStates,
    angle: Angle,
    animationProgress: number
  ): ImageBitmap {
    const frame = this._map.get(state)?.get(angle)?.getFrame(animationProgress)

    if (!frame) {
      throw new Error('Кадр не найден')
    }

    return frame
  }
}
