import { BaseUnit } from '../../../models/units/base/BaseUnit'
import { isMob } from '../../../models/units/base/BaseMob'
import { UnitAnimationsManager } from '../../AssetsManager/UnitAnimationsManager'
import { convertAngleToAssetsAngle } from '../../AssetsManager/utils'

const DEBUG_MODE = false

const NAME_STYLE_OPTIONS = {
  textHeight: 16,
  paddingX: 6,
  paddingY: 2,
}

export abstract class BaseUnitView {
  protected static _render(
    context: CanvasRenderingContext2D,
    unit: BaseUnit,
    unitAnimationsManager: UnitAnimationsManager
  ) {
    const { x, y } = unit.getPosition()
    const { width, height } = unit.getSize()
    const image = unitAnimationsManager.getFrame(
      unit.getState(),
      convertAngleToAssetsAngle(unit.getAngle()),
      unit.getActionProgress()
    )

    if (image) {
      context.drawImage(image, x, y, width, height)

      if (DEBUG_MODE) {
        // Рисуем хитбокс
        context.save()
        context.strokeStyle = 'red'
        context.lineWidth = 1
        context.strokeRect(x, y, width, height)
        context.restore()

        // Рисуем линию коллизии
        context.strokeStyle = 'blue'
        context.lineWidth = 3
        context.beginPath()
        context.moveTo(unit.collisionSegment.min.x, unit.collisionSegment.min.y)
        context.lineTo(unit.collisionSegment.max.x, unit.collisionSegment.max.y)
        context.stroke()

        // Отмечаем точку Position
        context.save()
        context.fillStyle = 'green'
        context.beginPath()
        context.arc(
          unit.getPosition().x,
          unit.getPosition().y,
          5,
          0,
          Math.PI * 2
        )
        context.fill()
        context.restore()
      }
    }

    if (isMob(unit)) {
      const name = unit.getName()
      const hp = unit.getHp()

      context.font = '14px Arial'
      context.textAlign = 'center'
      context.textBaseline = 'middle'

      const fullTextWidth = context.measureText(name).width
      const { textHeight, paddingX, paddingY } = NAME_STYLE_OPTIONS

      const boxWidth = fullTextWidth + paddingX * 2
      const boxHeight = textHeight + paddingY * 2

      const boxX = x + width / 2 - boxWidth / 2
      const boxY = y - boxHeight - 4

      context.fillStyle = 'rgba(0,0,0,0.6)'
      context.fillRect(boxX, boxY, boxWidth, boxHeight)

      context.fillStyle = 'white'
      context.fillText(hp, boxX + boxWidth / 2, boxY + boxHeight / 2)
    }
  }
}
