import { Position } from '../ViewModel'
import { BaseProjectileView } from './BaseProjectileView'
import { ProjectilesTypes } from './types'
import { AssetsManager } from '../AssetsManager/AnimationsManager'

const BOW_SPEED = 1400
const ARROW_SIZE = { width: 20, height: 40 }

export class ArrowProjectileView extends BaseProjectileView {
  _speed = BOW_SPEED
  _size = ARROW_SIZE
  _image: ImageBitmap

  constructor(assetsManager: AssetsManager, from: Position, to: Position) {
    super(from, to)
    this._image = assetsManager.getProjectile(ProjectilesTypes.BowArrow)
  }
}
