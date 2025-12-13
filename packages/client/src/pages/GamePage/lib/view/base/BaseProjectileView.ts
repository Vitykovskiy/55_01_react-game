import { BaseProjectile } from '../../../models/units/base/BaseProjectile'

export abstract class BaseProjectileView {
  protected static _render(
    context: CanvasRenderingContext2D,
    model: BaseProjectile,
    size: { width: number; height: number },
    image: ImageBitmap
  ): void {
    const { width, height } = size
    const { x, y } = model.position
    context.save()
    context.translate(x + width / 2, y + height / 2)
    context.rotate(model.angle + Math.PI / 2)
    context.drawImage(image, -width / 2, -height / 2, width, height)
    context.restore()
  }
}
