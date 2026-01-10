import { ModelsService } from '../models/ModelsService'
import { ArrowProjectileView } from './view/ArrowProjectileView'
import { MainHeroView } from './view/MainHeroView'
import { SkeletonView } from './view/SkeletonView'

export class ViewModel {
  constructor(private readonly _modelsService: ModelsService) {}

  render(ctx: CanvasRenderingContext2D) {
    for (const model of this._modelsService.enemies) {
      SkeletonView.render(ctx, model)
    }

    for (const model of this._modelsService.projectiles) {
      ArrowProjectileView.render(ctx, model)
    }

    MainHeroView.render(ctx, this._modelsService.hero)
  }
}
