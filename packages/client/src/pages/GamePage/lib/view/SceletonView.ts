import { BaseUnitView } from './BaseUnitView'
import { AssetsManager } from '../AssetsManager/AnimationsManager'
import { UnitAnimationsManager } from '../AssetsManager/UnitAnimationsManager'
import { UnitStates, UnitsTypes } from './types'

const SCELETON_WALK_STATE = {
  angle: 180,
  state: UnitStates.Walk,
  duration: 1200,
}

export class SceletonView extends BaseUnitView {
  protected _unitAnimationsManager: UnitAnimationsManager

  constructor(animationManager: AssetsManager) {
    super({ ...SCELETON_WALK_STATE })

    this._unitAnimationsManager = animationManager.getUnitManager(
      UnitsTypes.Orc
    )
  }
}
