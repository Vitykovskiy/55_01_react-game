import { BaseProjectile } from './units/base/BaseProjectile'
import { MainHero } from './units/MainHero'
import { BaseMob } from './units/base/BaseMob'

export class ModelsService {
  static _instance: ModelsService

  private _hero: MainHero = new MainHero({ x: 0, y: 0 })
  private _enemies: BaseMob[] = []
  private _projectiles: BaseProjectile[] = []

  constructor() {
    if (ModelsService._instance) {
      return ModelsService._instance
    }

    ModelsService._instance = this
  }

  public get hero() {
    return this._hero
  }

  public get enemies() {
    return this._enemies
  }

  public set enemies(value: BaseMob[]) {
    this._enemies = value
  }

  public get projectiles() {
    return this._projectiles
  }

  public set projectiles(value: BaseProjectile[]) {
    this._projectiles = value
  }

  public get models() {
    return {
      hero: this._hero,
      enemies: this._enemies,
      projectiles: this._projectiles,
    }
  }
}
