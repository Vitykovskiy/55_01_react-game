import { assetsManager } from '../AssetsManager/assets'
import { BaseProjectileView } from './base/BaseProjectileView'
import { ProjectilesViewTypes } from './types'
import { BaseProjectile } from '@pages/GamePage/models/units/base/BaseProjectile'

const ARROW_SIZE = { width: 20, height: 40 }

export class ArrowProjectileView extends BaseProjectileView {
  private static _size = ARROW_SIZE

  public static render(
    context: CanvasRenderingContext2D,
    model: BaseProjectile
  ): void {
    const image: ImageBitmap = assetsManager.getProjectile(
      ProjectilesViewTypes.BowArrow
    )

    ArrowProjectileView._render(
      context,
      model,
      ArrowProjectileView._size,
      image
    )
  }
}
