import { words } from '../models/consts'
import { EventBus } from '../models/EventBus'
import { MainHero } from '../models/MainHero'
import { Skeleton } from '../models/Skeleton'
import { Unit } from '../models/types'
import { BaseUnitView } from './view/BaseUnitView'
import { MainHeroView } from './view/MainHeroView'
import { SkeletonView } from './view/SkeletonView'
import { BaseProjectileView } from './view/BaseProjectileView'
import { ArrowProjectileView } from './view/ArrowProjectileView'
import { AssetsManager } from './AssetsManager/AnimationsManager'

export type EventType = 'start' | 'end'

const MIN_UNITS_TO_ADD_NEW_ENEMIES = 0
const NUMBER_ADDED_ENEMIES = 3

export class ViewModel extends EventBus<EventType> {
  private _units: { model: Unit; view: BaseUnitView }[] = []
  private _projectiles: BaseProjectileView[] = []
  private _hero: { model: MainHero; view: MainHeroView }
  private _currentScore = 0
  private _enemy?: Unit
  private _usedWords: string[] = []
  private _currentWords: string[] = []

  constructor(
    canvas: HTMLCanvasElement,
    private _assetsManager: AssetsManager
  ) {
    super()
    const { width, height } = canvas

    this._hero = {
      model: new MainHero(0, 0),
      view: new MainHeroView(this._assetsManager),
    }

    this._hero.model.setPosition({
      x: width / 2 - this._hero.model.getSize().width / 2,
      y: height - 200,
    })

    this._addInitialUnits()
  }

  public update(delta: number) {
    for (const { model } of this._units) {
      model.update(delta)

      const { y } = model.getPosition()

      if (!this._isUnitNearHero(y)) {
        continue
      }

      model.stop()
      model.tryDealDamage(this._hero.model)
    }

    for (const projectile of this._projectiles) {
      projectile.update(delta)
    }

    this._hero.model.update(delta)
  }

  private _generateUnitsBatch = (count: number) => {
    const startX = 100
    const stepX = 60

    for (let i = 0; i < count; i++) {
      const skeletonName = this._getRandomWord(
        words,
        this._usedWords,
        this._currentWords
      )

      if (!skeletonName) {
        //TODO обрабатывать случаи, когда слова закончилисью. Можно генерировать рандомные или заканчивать уровень
        break
      }

      const x = startX + i * stepX + Math.random() * 90 - 10 // смещение по X
      const y = Math.random() * 40 - 40 // случайное смещение по Y ±20

      const skeleton = new Skeleton(x, y, skeletonName)
      const skeletonView = new SkeletonView(this._assetsManager)

      this._units.push({ model: skeleton, view: skeletonView })
      this._currentWords.push(skeletonName)
    }
  }

  onKey = (key: string) => {
    this._trySetEnemy(key)
    this._tryHitEnemy(key)
    this._tryKillEnemy()
  }

  renderUnits(ctx: CanvasRenderingContext2D) {
    this._sortUnitsByYCoordinate()

    for (const { model, view } of this._units) {
      view.render(ctx, model)
    }

    for (const projectile of this._projectiles) {
      projectile.render(ctx)
    }

    this._hero.view.render(ctx, this._hero.model)
  }

  private _addInitialUnits(): void {
    this._generateUnitsBatch(3)
  }

  private _trySetEnemy = (key: string) => {
    //TODO Убрать, когда появится вывод на канвас выделенного врага
    console.log(this._enemy)
    if (!this._enemy) {
      const foundEnemy = this._units.find(
        unit => unit.model.getName()[0] === key
      )

      if (!foundEnemy) {
        //TODO установить звук промаха
        return
      }

      this._enemy = foundEnemy.model
    }
  }

  private _tryKillEnemy = async () => {
    if (!this._enemy || !this._enemy.isDead()) {
      return
    }

    this._updateScore(1)

    const enemy = this._enemy
    const viewModel = this._units.find(({ model }) => model === enemy)?.view

    if (!viewModel) {
      return
    }

    const enemyName = enemy.getName()
    this._usedWords.push(enemyName)

    await this._hero.view.showAttack()
    this._hero.view.showIddle()

    const arrow = this._shootArrowToTarget(enemy)

    await arrow.start()
    enemy.stop()

    delete this._enemy
    await viewModel.showDeath()

    this._removeProjectile(arrow)
    this._removeNameFromDictionary(enemyName)
    this._removeEnemy(enemy)
    this._tryAddEnemies()
  }

  private _shootArrowToTarget(target: Unit): ArrowProjectileView {
    const arrow = new ArrowProjectileView(
      this._assetsManager,
      {
        x:
          this._hero.model.getPosition().x +
          this._hero.model.getSize().width / 2,
        y:
          this._hero.model.getPosition().y -
          this._hero.model.getSize().height / 2,
      },
      {
        x: target.getPosition().x + target.getSize().width / 2,
        y: target.getPosition().y,
      }
    )
    this._projectiles.push(arrow)

    return arrow
  }

  private _tryAddEnemies() {
    if (this._units.length !== MIN_UNITS_TO_ADD_NEW_ENEMIES) {
      return
    }

    this._generateUnitsBatch(NUMBER_ADDED_ENEMIES)
  }

  private _updateScore = (addedPoints: number) => {
    //TODO избавиться от addedPoints
    //TODO Добавить логику добавления очков к счёту в зависимости от вида моба(врага)
    this._currentScore += addedPoints
    //TODO Сделать вывод новых очков в canvas
    console.log(this._currentScore)
  }

  private _tryHitEnemy = (key: string) => {
    if (!this._enemy) {
      return
    }

    const enemyUnit = this._enemy
    const unitName = enemyUnit.getName()
    const unitHp = enemyUnit.getHp()

    const targetKey = unitName[unitName.length - unitHp]

    if (targetKey !== key) {
      //TODO добавить звук промаха
      return
    }

    this._enemy.applyDamage(1)
  }

  private _getRandomWord = (
    words: string[],
    usedWords: string[],
    currentWords: string[]
  ): string | null => {
    const forbiddenLetters = new Set(currentWords.map(w => w[0]))

    const candidates = words.filter(
      word =>
        !usedWords.includes(word) &&
        !currentWords.includes(word) &&
        !forbiddenLetters.has(word[0])
    )

    if (candidates.length === 0) {
      return null
    }

    const index = Math.floor(Math.random() * candidates.length)
    return candidates[index]
  }

  private _isUnitNearHero(y: number): boolean {
    return (
      y >= this._hero.model.getPosition().y - this._hero.model.getSize().height
    )
  }

  private _removeProjectile(value: BaseProjectileView): void {
    this._projectiles = this._projectiles.filter(item => item !== value)
  }

  private _removeNameFromDictionary(value: string): void {
    this._currentWords = this._currentWords.filter(word => word !== value)
  }

  private _removeEnemy(value: Unit): void {
    this._units = this._units.filter(unit => unit.model !== value)
  }

  // Кто позднее отрендерился, тот и сверху
  // Сортируем по Y координате для корректного наложения
  private _sortUnitsByYCoordinate(): void {
    this._units.sort(
      (a, b) => a.model.getPosition().y - b.model.getPosition().y
    )
  }
}
