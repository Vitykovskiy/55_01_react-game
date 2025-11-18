import { Sceleton } from '../../models/Sceleton'
import { BaseUnitView } from '../BaseUnitView'
import sceleton from '/charactes/sceleton.png'

let sceletonView: HTMLImageElement | null = null
if (typeof window !== 'undefined') {
  sceletonView = new Image()
  sceletonView.src = sceleton
}

export class SceletonView extends BaseUnitView {
  override render(ctx: CanvasRenderingContext2D, unit: Sceleton) {
    this._render(ctx, sceletonView, unit)
  }
}
