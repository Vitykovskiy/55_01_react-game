import { BaseUnitView } from './BaseUnitView'
import { AssetsManager } from '../AssetsManager/AnimationsManager'
import { UnitAnimationsManager } from '../AssetsManager/UnitAnimationsManager'
import { UnitStates, UnitsTypes } from './types'

const SKELETONE_WALK_DURATION_MS = 1200
const SKELETONE_VIEW_ANGLE = 180

const SKELETON_WALK_STATE = {
  angle: SKELETONE_VIEW_ANGLE,
  state: UnitStates.Walk,
  duration: SKELETONE_WALK_DURATION_MS,
}

export class SkeletonView extends BaseUnitView {
  protected _unitAnimationsManager: UnitAnimationsManager

  constructor(animationManager: AssetsManager) {
    super({ ...SKELETON_WALK_STATE })

    this._unitAnimationsManager = animationManager.getUnitManager(
      UnitsTypes.Orc
    )
  }
}
