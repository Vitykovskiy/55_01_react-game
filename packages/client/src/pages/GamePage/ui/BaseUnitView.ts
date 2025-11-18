import { Unit } from '../models/types'

export abstract class BaseUnitView {
  protected _render(
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement | null,
    unit: Unit
  ) {
    const { x, y } = unit.getPosition()
    const { width, height } = unit.getSize()
    const name = unit.getName()
    const hp = unit.getHp()
    const text = name.slice(name.length - hp) // вычисляем текст по текущему hp

    if (image?.complete) {
      ctx.drawImage(image, x, y, width, height)
    }

    // параметры текста
    ctx.font = '14px Arial'
    ctx.textAlign = 'center'
    ctx.textBaseline = 'middle'

    // измеряем ширину полного имени (для ширины подложки)
    const fullTextWidth = ctx.measureText(name).width
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

  abstract render(ctx: CanvasRenderingContext2D, unit: Unit): void
}
