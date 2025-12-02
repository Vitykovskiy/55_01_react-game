import { AssetsManager } from '../AssetsManager/AnimationsManager'
import { UnitAnimationsManager } from '../AssetsManager/UnitAnimationsManager'
import { BaseUnitView } from './BaseUnitView'
import { MainHeroStates, UnitsTypes } from './types'

const MAIN_HERO_ATTACK_ANIMATION_DURATION_MS = 600
const MAIN_HERO_DEATH_ANIMATION_DURATION_MS = 1500
const MAIN_HERO_IDDLE_ANIMATION_DURATION_MS = 1500

export class MainHeroView extends BaseUnitView {
  protected _unitAnimationsManager: UnitAnimationsManager

  constructor(animationManager: AssetsManager) {
    super({
      state: MainHeroStates.IdleBow,
      angle: 0,
      duration: 1000,
    })
    this._unitAnimationsManager = animationManager.getUnitManager(
      UnitsTypes.MainHero
    )
  }

  async showDeath(): Promise<void> {
    this.setViewState({
      state: MainHeroStates.DeathBow,
      duration: MAIN_HERO_DEATH_ANIMATION_DURATION_MS,
    })
    await this.showAnimationOnce()
  }

  async showAttack(): Promise<void> {
    this.setViewState({
      state: MainHeroStates.AttackBow,
      duration: MAIN_HERO_ATTACK_ANIMATION_DURATION_MS,
    })
    await this.showAnimationOnce()
  }

  showIddle(): void {
    this.setViewState({
      state: MainHeroStates.IdleBow,
      duration: MAIN_HERO_IDDLE_ANIMATION_DURATION_MS,
    })
    this.startAnimationLoop()
  }
}
