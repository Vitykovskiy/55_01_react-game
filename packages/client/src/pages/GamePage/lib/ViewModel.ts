import { ModelsService } from '../models/ModelsService'
import { ArrowProjectileView } from './view/ArrowProjectileView'
import { MainHeroView } from './view/MainHeroView'
import { SkeletonView } from './view/SkeletonView'

export class ViewModel {
  private readonly _ModelsService!: ModelsService

  constructor() {
    this._ModelsService = new ModelsService()
  }

  render(ctx: CanvasRenderingContext2D) {
    for (const model of this._ModelsService.enemies) {
      SkeletonView.render(ctx, model)
    }

    for (const model of this._ModelsService.projectiles) {
      ArrowProjectileView.render(ctx, model)
    }

    MainHeroView.render(ctx, this._ModelsService.hero)
  }
}
