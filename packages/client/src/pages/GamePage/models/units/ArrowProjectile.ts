import { BaseProjectile } from './base/BaseProjectile'

const BOW_SPEED = 1400 / 1000

export class ArrowProjectile extends BaseProjectile {
  _speed = BOW_SPEED
}
