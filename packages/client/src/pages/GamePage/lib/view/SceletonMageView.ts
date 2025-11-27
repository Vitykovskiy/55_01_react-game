import { SceletonMage } from '../../models/SceletonMage'
import { BaseUnitView } from './BaseUnitView'
import sceletonMage from '/charactes/sceleton-mage.png'

let sceletonMageImage: HTMLImageElement | null = null
if (typeof window !== 'undefined') {
  sceletonMageImage = new Image()
  sceletonMageImage.src = sceletonMage
}

export class SceletonMageView extends BaseUnitView {
  override render(ctx: CanvasRenderingContext2D, unit: SceletonMage) {
    this._render(ctx, sceletonMageImage, unit)
  }
}
