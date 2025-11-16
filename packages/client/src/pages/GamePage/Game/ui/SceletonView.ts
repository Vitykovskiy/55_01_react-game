import { Sceleton } from '../models/Sceleton'
import { BaseUnitView } from './BaseUnitView'
import sceleton from '/charactes/sceleton.png'

let heroImage: HTMLImageElement | null = null
if (typeof window !== 'undefined') {
  heroImage = new Image()
  heroImage.src = sceleton
}

export class SceletonView extends BaseUnitView {
  override render(ctx: CanvasRenderingContext2D, unit: Sceleton) {
    const { x, y } = unit.getPosition()
    const { width, height } = unit.size

    if (heroImage?.complete) {
      ctx.drawImage(heroImage, x, y, width, height)
    }

    // вычисляем текст по текущему hp
    const name = unit.name
    const hp = unit.getHp()
    const text = name.slice(name.length - hp)

    // параметры текста
    ctx.font = '14px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // измеряем ширину полного имени (для ширины подложки)
    const fullTextWidth = ctx.measureText(unit.name).width
    const textHeight = 16

    // позиция подложки
    const paddingX = 6
    const paddingY = 2

    const boxWidth = fullTextWidth + paddingX * 2
    const boxHeight = textHeight + paddingY * 2

    const boxX = x + width / 2 - boxWidth / 2
    const boxY = y - boxHeight - 4

    // рисуем подложку
    ctx.fillStyle = 'rgba(0,0,0,0.6)'
    ctx.fillRect(boxX, boxY, boxWidth, boxHeight)

    // рисуем оставшиеся буквы (HP)
    ctx.fillStyle = 'white'
    ctx.fillText(text, boxX + boxWidth / 2, boxY + boxHeight / 2)
  }
}
