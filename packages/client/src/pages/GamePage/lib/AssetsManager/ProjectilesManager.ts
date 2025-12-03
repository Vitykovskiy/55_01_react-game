import { ProjectilesParamsMap } from './types'
import { loadImage } from './utils'

const getFilePath = (name: string) => `projectiles/${name}.png`

export class ProjectilesManger {
  private _projectilesMap = new Map<string, ImageBitmap>()

  constructor(private _spriteSheets: Record<string, string>) {}

  public get(name: string): ImageBitmap {
    const image = this._projectilesMap.get(name)

    if (!image) {
      throw new Error(`Ассет снаряда "${name}" не найден`)
    }

    return image
  }

  public async init(projectilesParamsMap: ProjectilesParamsMap): Promise<void> {
    for await (const [name, file] of projectilesParamsMap) {
      const image = await this._createImage(name, file)
      this._projectilesMap.set(name, image)
    }
  }

  private async _createImage(name: string, file: string): Promise<ImageBitmap> {
    const entry = Object.entries(this._spriteSheets).find(([key]) =>
      key.endsWith(getFilePath(file))
    )

    if (!entry) {
      throw new Error(`Изображение "${name}.png" отсутствует общем массиве`)
    }

    const [, url] = entry
    const image = await loadImage(url)
    return createImageBitmap(image)
  }
}
