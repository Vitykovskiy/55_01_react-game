import { assetsManager } from '../AssetsManager/assets'
import { BaseUnitView } from './base/BaseUnitView'
import { UnitsViewTypes } from './types'
import { BaseUnit } from '@pages/GamePage/models/units/base/BaseUnit'

export class MainHeroView extends BaseUnitView {
  public static render(
    context: CanvasRenderingContext2D,
    unit: BaseUnit
  ): void {
    const unitAnimationsManager = assetsManager.getUnitManager(
      UnitsViewTypes.MainHero
    )
    MainHeroView._render(context, unit, unitAnimationsManager)
  }
}
