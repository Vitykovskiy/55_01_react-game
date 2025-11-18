import { MainHero } from '../../models/MainHero'
import { BaseUnitView } from '../../ui/BaseUnitView'
import heroSprite from '/charactes/main-character.png'

let heroImage: HTMLImageElement | null = null
if (typeof window !== 'undefined') {
  heroImage = new Image()
  heroImage.src = heroSprite
}

export class MainHeroView extends BaseUnitView {
  override render(ctx: CanvasRenderingContext2D, unit: MainHero) {
    this._render(ctx, heroImage, unit)
  }
}
