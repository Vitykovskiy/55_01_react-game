import { words } from '../models/consts'
import { EventBus } from '../models/EventBus'
import { MainHero } from '../models/MainHero'
import { Sceleton } from '../models/Sceleton'
import { Unit } from '../models/types'
import { BaseUnitView } from './view/BaseUnitView'
import { MainHeroView } from './view/MainHeroView'
import { SceletonView } from './view/SceletonView'

export type EventType = 'start' | 'end'

export class ViewModel extends EventBus<EventType> {
  private _units: { model: Unit; view: BaseUnitView }[] = []
  private _hero: MainHero
  private _currentScore = 0
  private _enemy?: {
    index: number
    unit: Unit
  }
  private _usedWords: string[] = []
  private _currentWords: string[] = []

  constructor(canvas: HTMLCanvasElement) {
    super()
    const { width, height } = canvas
    this._hero = new MainHero(0, 0)
    this._hero.setPosition({
      x: width / 2 - this._hero.getSize().width / 2,
      y: height - 200,
    })
    this.addInitialUnits()
  }

  private addInitialUnits() {
    const heroView = new MainHeroView()
    this._units.push({ model: this._hero, view: heroView })
    this.generateUnitsBatch(3)
  }

  update(delta: number) {
    for (const { model } of this._units) {
      model.update(delta)

      if (model == this._hero) {
        continue
      }

      const { y } = model.getPosition()

      if (!this._isUnitNearHero(y)) {
        continue
      }

      model.stop()
      model.tryDealDamage(this._hero)
    }
  }

  generateUnitsBatch = (count: number) => {
    const startX = 100
    const stepX = 60

    for (let i = 0; i < count; i++) {
      const sceletonName = this.getRandomWord(
        words,
        this._usedWords,
        this._currentWords
      )

      if (!sceletonName) {
        //TODO обрабатывать случаи, когда слова закончилисью. Можно генерировать рандомные или заканчивать уровень
        break
      }

      const x = startX + i * stepX + Math.random() * 90 - 10 // смещение по X
      const y = 100 + Math.random() * 40 - 20 // случайное смещение по Y ±20

      const sceleton = new Sceleton(x, y, sceletonName)
      const skeletonView = new SceletonView()

      this._units.push({ model: sceleton, view: skeletonView })
      this._currentWords.push(sceletonName)
    }
  }

  onKey = (key: string) => {
    this._trySetEnemy(key)
    this._tryHitEnemy(key)
    this._tryKillEnemy()
  }

  renderUnits(ctx: CanvasRenderingContext2D) {
    for (const { model, view } of this._units) {
      view.render(ctx, model)
    }
  }

  private _trySetEnemy = (key: string) => {
    console.log(this._enemy)
    if (!this._enemy) {
      const enemyIndex = this._units.findIndex(
        unit => unit.model.getName()[0] === key
      )

      if (enemyIndex >= 0) {
        this._enemy = {
          index: enemyIndex,
          unit: this._units[enemyIndex].model,
        }
      }

      //TODO установить звук промаха
    }
  }

  private _tryKillEnemy = () => {
    if (this._enemy && this._enemy.unit.isDead()) {
      this._updateScore(1)
      const word = this._enemy.unit.getName()
      this._usedWords.push(word)

      const indexInCurrent = this._currentWords.indexOf(word)
      if (indexInCurrent !== -1) {
        this._currentWords.splice(indexInCurrent, 1)
      }

      this._units.splice(this._enemy.index, 1)
      this._enemy = undefined

      if (this._units.length === 1) {
        this.generateUnitsBatch(3)
      }
    }
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
      //TODO добавить воспроизведение звука промоха
      return
    }

    const enemyUnit = this._enemy.unit
    const unitName = enemyUnit.getName()
    const unitHp = enemyUnit.getHp()

    const targetKey = unitName[unitName.length - unitHp]

    if (targetKey == key) {
      this._enemy.unit.applyDamage(1)
    }
  }

  generateUnit = () => {
    const sceletonName = this.getRandomWord(
      words,
      this._usedWords,
      this._currentWords
    )
    if (!sceletonName) {
      throw new Error('cannot init skeleton')
    }
    const sceleton = new Sceleton(200, 100, sceletonName)
    const skeletonView = new SceletonView()

    this._units.push({ model: sceleton, view: skeletonView })
    this._currentWords.push(sceletonName)
  }

  private getRandomWord = (
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

  private _isUnitNearHero(y: number) {
    if (y >= this._hero.getPosition().y - this._hero.getSize().height) {
      return true
    }

    return false
  }
}
