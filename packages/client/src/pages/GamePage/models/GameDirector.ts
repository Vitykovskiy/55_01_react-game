import { Dictionary } from '../lib/Dictionary'
import { ArrowProjectile } from './units/ArrowProjectile'
import { BaseProjectile } from './units/base/BaseProjectile'
import { EventBus } from './EventBus'
import { isMob, BaseMob } from './units/base/BaseMob'
import { ModelsService } from './ModelsService'
import { Skeleton } from './units/Skeleton'
import {
  GameEvents,
  HeroEvents,
  MobEvents,
  ProjectileEvents,
  ScenarioEvents,
} from './types'
import { Size, MobStates, MainHeroStates } from './units/base/types'

const MIN_UNITS_TO_ADD_NEW_ENEMIES = 0
const NUMBER_ADDED_ENEMIES = 3

export class GameDirector {
  private _dictionary = new Dictionary()
  private _eventBus = new EventBus<GameEvents>()
  private _modelService = new ModelsService()

  private _currentScore = 0
  private _focusedEnemy: BaseMob | null = null

  constructor(private _fieldSize: Size = { width: 0, height: 0 }) {
    const { width, height } = this._fieldSize

    this._hero.setPosition({
      x: width / 2 - this._hero.getSize().width / 2,
      y: height - 200,
    })

    this._addEnemies()
    this._initEventsListeners()
  }

  public get eventBus() {
    return this._eventBus
  }

  private get _hero() {
    return this._modelService.hero
  }

  private get _enemies() {
    return this._modelService.enemies
  }

  private set _enemies(value: BaseMob[]) {
    this._modelService.enemies = value
  }

  private get _projectiles() {
    return this._modelService.projectiles
  }

  private set _projectiles(value: BaseProjectile[]) {
    this._modelService.projectiles = value
  }

  public onKey(key: string): void {
    this._trySetEnemy(key)
    this._tryHitEnemy(key)
    this._tryKillEnemy()
  }

  public update(delta: number): void {
    this._hero.update(delta)
    this._enemies.forEach(item => item.update(delta))
    this._projectiles.forEach(item => item.update(delta))
  }

  private _initEventsListeners(): void {
    this._initMobsEventsListeners()
    this._initHeroEventsListeners()
    this._initProjectileEventsListeners()
    this._initGameEventsListeners()
  }

  private _initMobsEventsListeners(): void {
    this.eventBus.on(MobEvents.Attacks, () => {
      this._hero.onHit()
      if (this._hero.isDead()) {
        this._eventBus.emit(HeroEvents.DeathBow)
      }
    })

    this.eventBus.on(MobEvents.Death, unit => {
      if (!isMob(unit)) {
        return
      }
      unit.breakCurrentAction()
      unit.setActionProgress(0)
      unit.setState(MobStates.Death)
      unit.actionEmitPromise().then(() => {
        this._removeEnemy(unit)
        this._checkEnemies()
      })

      this._dictionary.addToUsed(unit.getName())
    })
  }

  private _initProjectileEventsListeners(): void {
    this.eventBus.on(ProjectileEvents.Launched, target => {
      if (!isMob(target)) {
        return
      }
      this._shootArrowToTarget(target)
    })

    this.eventBus.on(ProjectileEvents.Landed, target => {
      if (!isMob(target)) {
        return
      }
      this.eventBus.emit(MobEvents.Death, target)
    })
  }

  private _initHeroEventsListeners(): void {
    this.eventBus.on(HeroEvents.AttacksRange, () => {
      //
    })

    this.eventBus.on(HeroEvents.AttacksRange, () => {
      //
    })

    this.eventBus.on(HeroEvents.AttacksMelee, () => {
      //
    })

    this.eventBus.on(HeroEvents.DeathBow, () => {
      //
    })
  }

  private _initGameEventsListeners(): void {
    this.eventBus.on(ScenarioEvents.EnemiesDefeated, () => {
      this._addEnemies()
    })
  }

  private _generateUnitsBatch = (count: number) => {
    const startX = 10
    const stepX = 120
    for (let i = 0; i < count; i++) {
      const skeletonName = this._dictionary.getRandomWord()

      if (!skeletonName) {
        //TODO обрабатывать случаи, когда слова закончилисью. Можно генерировать рандомные или заканчивать уровень
        break
      }

      const x = startX + i * stepX + Math.random() * 90 - 10 // смещение по X
      const y = Math.random() * 40 - 20 // случайное смещение по Y ±20

      const skeleton = new Skeleton(
        skeletonName,
        { x, y },
        this._hero,
        this.eventBus
      )
      skeleton.setActionProgress(Math.random() * 100) // Чтобы не было синхронной ходьбы

      this._enemies.push(skeleton)
      this._dictionary.addToCurrent(skeletonName)
    }

    this._enemies = this._sortUnitsByYCoordinate(this._enemies)
  }

  private _trySetEnemy = (key: string) => {
    //TODO Убрать, когда появится вывод на канвас выделенного врага
    if (!this._focusedEnemy) {
      const foundEnemy = this._enemies.find(unit => unit.getName()[0] === key)

      if (!foundEnemy) {
        //TODO установить звук промаха
        return
      }

      this._focusedEnemy = foundEnemy
    }
  }

  private _tryHitEnemy = (key: string) => {
    if (!this._focusedEnemy) {
      return
    }

    const enemyUnit = this._focusedEnemy
    const unitHp = enemyUnit.getHp()

    const targetKey = unitHp[0]

    if (targetKey !== key) {
      //TODO добавить звук промаха
      return
    }

    this._focusedEnemy.dicreaseHp()
  }

  private _tryKillEnemy = async () => {
    if (!this._focusedEnemy || !this._focusedEnemy.isDead()) {
      return
    }

    this._updateScore(1)

    const enemy = this._focusedEnemy
    this._focusedEnemy = null

    this._hero.setState(MainHeroStates.AttackBow)
    this._hero.actionEmitPromise().then(value => {
      if (!value) return
      this.eventBus.emit(ProjectileEvents.Launched, enemy)
    })

    this._hero.actionPromise().then(value => {
      if (!value) return
      this._hero.setState(MainHeroStates.IdleBow)
    })
  }

  private _checkEnemies() {
    if (this._enemies.length === MIN_UNITS_TO_ADD_NEW_ENEMIES) {
      this.eventBus.emit(ScenarioEvents.EnemiesDefeated)
    }
  }

  private _addEnemies() {
    this._enemies = []
    this._generateUnitsBatch(NUMBER_ADDED_ENEMIES)
  }

  private _removeEnemy(value: BaseMob): void {
    this._enemies = this._enemies.filter(unit => unit !== value)
  }

  private _updateScore = (addedPoints: number) => {
    //TODO избавиться от addedPoints
    //TODO Добавить логику добавления очков к счёту в зависимости от вида моба(врага)
    this._currentScore += addedPoints
    //TODO Сделать вывод новых очков в canvas
    console.log(this._currentScore)
  }

  private _shootArrowToTarget(target: BaseMob): void {
    const arrow = new ArrowProjectile(
      {
        x: this._hero.getPosition().x + this._hero.getSize().width / 2,
        y: this._hero.getPosition().y - this._hero.getSize().height / 2,
      },
      {
        x: target.getPosition().x + target.getSize().width / 2,
        y: target.getPosition().y,
      }
    )

    this._projectiles.push(arrow)

    arrow.launch().then(() => {
      this._eventBus.emit(ProjectileEvents.Landed, target)
      this._removeProjectile(arrow)
    })
  }

  private _removeProjectile(projectile: BaseProjectile): void {
    this._projectiles = this._projectiles.filter(value => value !== projectile)
  }

  private _sortUnitsByYCoordinate(enemies: BaseMob[]): BaseMob[] {
    return enemies.sort((a, b) => a.getPosition().y - b.getPosition().y)
  }
}
