import { UnitsViewTypes } from './types'
import { BaseUnitView } from './base/BaseUnitView'
import { BaseUnit } from '@pages/GamePage/models/units/base/BaseUnit'
import { assetsManager } from '../AssetsManager/assets'

export class SkeletonView extends BaseUnitView {
  public static render(
    context: CanvasRenderingContext2D,
    unit: BaseUnit
  ): void {
    const unitAnimationsManager = assetsManager.getUnitManager(
      UnitsViewTypes.Orc
    )
    BaseUnitView._render(context, unit, unitAnimationsManager)
  }
}
