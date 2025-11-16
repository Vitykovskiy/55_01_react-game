import { BaseUnit } from '../models/BaseUnit'
import { words } from '../models/consts'
import { EventBus } from '../models/EventBus'
import { MainHero } from '../models/MainHero'
import { Sceleton } from '../models/Sceleton'
import { BaseUnitView } from '../ui/BaseUnitView'
import { MainHeroView } from '../ui/MainHeroView'
import { SceletonView } from '../ui/SceletonView'

function getRandomWord(
  words: string[],
  usedWords: string[],
  currentWords: string[]
): string | null {
  const forbiddenLetters = new Set(currentWords.map(w => w[0]))

  // фильтруем кандидатов
  const candidates = words.filter(
    w =>
      !usedWords.includes(w) &&
      !currentWords.includes(w) &&
      !forbiddenLetters.has(w[0])
  )

  if (candidates.length === 0) {
    return null // нет подходящих слов
  }

  // берем случайное
  const index = Math.floor(Math.random() * candidates.length)
  return candidates[index]
}

export type EventType = 'start' | 'end'

export class ViewModel extends EventBus<EventType> {
  canvas: HTMLCanvasElement
  private units: { model: BaseUnit; view: BaseUnitView }[] = []
  hero: MainHero
  enemy?: {
    index: number
    unit: BaseUnit
  }
  usedWords: string[] = []
  currentWords: string[] = []

  constructor(canvas: HTMLCanvasElement) {
    super()
    this.canvas = canvas
    const { width, height } = canvas
    this.hero = new MainHero(0, 0)
    this.hero.setPosition({
      x: width / 2 - this.hero.size.width / 2,
      y: height - 200,
    })
    this.addInitialUnits()
  }

  private addInitialUnits() {
    const heroView = new MainHeroView()
    this.units.push({ model: this.hero, view: heroView })
    this.generateUnitsBatch(3)
  }

  update(delta: number) {
    for (const { model } of this.units) {
      model.update(delta)

      if (model !== this.hero) {
        const { y } = model.getPosition()

        if (y >= this.hero.getPosition().y - this.hero.size.height) {
          model.stop()
        }

        if (model.canDealDamage()) {
          this.hero.applyDamage(1)
          model.resetDamageTimer()
          if (this.hero.hp === 0) {
            this.emit('end')
          }
        }
      }
    }
  }

  generateUnitsBatch = (count: number) => {
    const startX = 100
    const stepX = 60

    for (let i = 0; i < count; i++) {
      const sceletonName = getRandomWord(
        words,
        this.usedWords,
        this.currentWords
      )
      if (!sceletonName) {
        //TODO обрабатывать случаи, когда слова закончилисью. Можно генерировать рандомные или заканчивать уровень
        break
      }

      const x = startX + i * stepX + Math.random() * 90 - 10 // смещение по X
      const y = 100 + Math.random() * 40 - 20 // случайное смещение по Y ±20

      const sceleton = new Sceleton(x, y, sceletonName)
      const skeletonView = new SceletonView()

      this.units.push({ model: sceleton, view: skeletonView })
      this.currentWords.push(sceletonName)
    }
  }

  onKey = (_: string) => {
    //TODO добавить механику ввода и убийства вражеских юнитов
  }

  generateUnit = () => {
    const sceletonName = getRandomWord(words, this.usedWords, this.currentWords)
    if (!sceletonName) {
      throw new Error('cannot init skeleton')
    }
    const sceleton = new Sceleton(200, 100, sceletonName)
    const skeletonView = new SceletonView()

    this.units.push({ model: sceleton, view: skeletonView })
    this.currentWords.push(sceletonName)
  }

  renderUnits(ctx: CanvasRenderingContext2D) {
    for (const { model, view } of this.units) {
      view.render(ctx, model)
    }
  }
}
