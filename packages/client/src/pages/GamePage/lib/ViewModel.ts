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
  private _canvas: HTMLCanvasElement
  private _units: { model: Unit; view: BaseUnitView }[] = []
  private _hero: MainHero
  private _enemy?: {
    index: number
    unit: Unit
  }
  private _usedWords: string[] = []
  private _currentWords: string[] = []

  constructor(canvas: HTMLCanvasElement) {
    super()
    this._canvas = canvas
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

  onKey = (_: string) => {
    //TODO добавить механику ввода и убийства вражеских юнитов
  }

  renderUnits(ctx: CanvasRenderingContext2D) {
    for (const { model, view } of this._units) {
      view.render(ctx, model)
    }
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
