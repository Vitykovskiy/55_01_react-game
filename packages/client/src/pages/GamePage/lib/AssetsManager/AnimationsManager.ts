import { ProjectilesManger } from './ProjectilesManager'
import { UnitAnimationParamsMap, ProjectilesParamsMap } from './types'
import { UnitAnimationsManager } from './UnitAnimationsManager'

export class AssetsManager {
  private _unitManagers: Map<string, UnitAnimationsManager>
  private _projectileMangers: ProjectilesManger
  private _spriteSheets: Record<string, string>

  private _initPromise: Promise<void> | null = null

  constructor(spriteSheets: Record<string, string>) {
    this._spriteSheets = spriteSheets
    this._unitManagers = new Map<string, UnitAnimationsManager>()
    this._projectileMangers = new ProjectilesManger(this.spriteSheets)
  }

  public get spriteSheets() {
    if (!this._spriteSheets) {
      throw Error('Менеджер ассетов некорректно инициализирован')
    }
    return this._spriteSheets
  }

  public async init(
    unitsParamsMap: UnitAnimationParamsMap,
    projectilesParamsMap: ProjectilesParamsMap
  ): Promise<void> {
    if (this._initPromise) {
      return this._initPromise
    }

    // Паралелльная загрузка ассетов
    this._initPromise = (async () => {
      const params = Array.from(unitsParamsMap)

      const unitPromises = params.map(async ([name, statesParamsMap]) => {
        const unitManager = new UnitAnimationsManager(this.spriteSheets)
        await unitManager.generateAnimationMap(statesParamsMap)
        this._unitManagers.set(name, unitManager)
      })

      await Promise.all([
        ...unitPromises,
        this._projectileMangers.init(projectilesParamsMap),
      ])
    })()

    return this._initPromise
  }

  public getUnitManager(name: string): UnitAnimationsManager {
    const manager = this._unitManagers.get(name)

    if (!manager) {
      throw new Error(`Для юнита "${name}" менеджер анимации не создан`)
    }

    return manager
  }

  public getProjectile(name: string): ImageBitmap {
    return this._projectileMangers.get(name)
  }
}
