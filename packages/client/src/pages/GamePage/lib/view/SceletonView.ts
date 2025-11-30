import { BaseUnitView } from './BaseUnitView'
import { AssetsManager } from '../AssetsManager/AnimationsManager'
import { UnitAnimationsManager } from '../AssetsManager/UnitAnimationsManager'
import { UnitStates, UnitsTypes } from './types'

const SCELETONE_WALK_DURATION_MS = 1200
const SCELETONE_VIEW_ANGLE = 180

const SCELETON_WALK_STATE = {
  angle: SCELETONE_VIEW_ANGLE,
  state: UnitStates.Walk,
  duration: SCELETONE_WALK_DURATION_MS,
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
