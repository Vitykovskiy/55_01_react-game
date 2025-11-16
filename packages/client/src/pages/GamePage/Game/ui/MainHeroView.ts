import { MainHero } from '../models/MainHero'
import { BaseUnitView } from './BaseUnitView'
import heroSprite from '/charactes/main-character.png'

let heroImage: HTMLImageElement | null = null
if (typeof window !== 'undefined') {
  heroImage = new Image()
  heroImage.src = heroSprite
}

export class MainHeroView extends BaseUnitView {
  override render(ctx: CanvasRenderingContext2D, unit: MainHero) {
    if (heroImage?.complete) {
      ctx.drawImage(
        heroImage,
        unit.getPosition().x,
        unit.getPosition().y,
        unit.size.width,
        unit.size.height
      )
    }
  }
}
