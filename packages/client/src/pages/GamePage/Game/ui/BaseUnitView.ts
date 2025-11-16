import { BaseUnit } from '../models/BaseUnit'

export abstract class BaseUnitView {
  abstract render(ctx: CanvasRenderingContext2D, unit: BaseUnit): void
}
