import { FramesModes, SpriteAnimationProps } from './types'
import { loadImage } from './utils'

export class SpriteAnimation {
  private _sheetUrl: string
  private _columns: number
  private _rows: number
  private _scale: number
  private _mode: FramesModes
  private _frames: ImageBitmap[] = []
  private _spriteSheets: Record<string, string>

  constructor({
    source,
    columns,
    rows,
    scale = 1,
    mode = FramesModes.Sheet,
    spriteSheets,
  }: SpriteAnimationProps) {
    this._columns = columns
    this._rows = rows
    this._scale = scale
    this._mode = mode
    this._spriteSheets = spriteSheets
    this._sheetUrl = source
    if (this._mode === FramesModes.Sheet) {
      this._sheetUrl = this._findSheetUrl(source)
    }
  }

  public async init(): Promise<void> {
    if (this._mode === FramesModes.Frames) {
      await this._initFromFrames()
    } else {
      this._initFromSheet()
    }
  }

  public getFrame(progress: number): ImageBitmap {
    const index = Math.round(((this._frames.length - 1) * progress) / 100)

    if (!this._frames[index]) {
      throw new Error(`Кадр с индексом "${index}" не найден`)
    }

    return this._frames[index]
  }

  private _findSheetUrl(sheetSource: string): string {
    const entry = Object.entries(this._spriteSheets).find(([key]) =>
      key.endsWith(sheetSource)
    )

    if (!entry) {
      throw new Error(`Лист "${sheetSource}" не найден`)
    }

    return entry[1]
  }

  private async _initFromSheet(): Promise<void> {
    const sheet = await loadImage(this._sheetUrl)

    const sheetWidth = sheet.width
    const sheetHeight = sheet.height

    if (!sheetWidth || !sheetHeight || this._columns <= 0 || this._rows <= 0) {
      throw new Error(`Некорректные параметры листа "${this._sheetUrl}"`)
    }

    const frameWidth = sheetWidth / this._columns
    const frameHeight = sheetHeight / this._rows

    if (
      !frameWidth ||
      !frameHeight ||
      !Number.isFinite(frameWidth) ||
      !Number.isFinite(frameHeight)
    ) {
      throw new Error(`Некорректные параметры листа "${this._sheetUrl}"`)
    }

    const cropWidth = frameWidth / this._scale
    const cropHeight = frameHeight / this._scale
    const offsetX = (frameWidth - cropWidth) / 2
    const offsetY = (frameHeight - cropHeight) / 2

    for (let row = 0; row < this._rows; row++) {
      for (let col = 0; col < this._columns; col++) {
        const sx = col * frameWidth + offsetX
        const sy = row * frameHeight + offsetY

        const frame = await createImageBitmap(
          sheet,
          sx,
          sy,
          cropWidth,
          cropHeight,
          {
            resizeWidth: frameWidth,
            resizeHeight: frameHeight,
          }
        )

        this._frames.push(frame)
      }
    }
  }

  private async _initFromFrames(): Promise<void> {
    const entries = Object.entries(this._spriteSheets)
      .filter(([key]) => key.includes(this._sheetUrl))
      .map(([key, url]) => ({ key, url }))
      .sort((a, b) => a.key.localeCompare(b.key))

    if (!entries.length) {
      throw new Error('Frames for "' + this._sheetUrl + '" not found')
    }

    for (const { url } of entries) {
      const img = await loadImage(url)

      if (!img.width || !img.height) {
        throw new Error(`Некорректные параметры листа "${this._sheetUrl}"`)
      }

      const frameWidth = img.width
      const frameHeight = img.height

      const cropWidth = frameWidth / this._scale
      const cropHeight = frameHeight / this._scale
      const offsetX = (frameWidth - cropWidth) / 2
      const offsetY = (frameHeight - cropHeight) / 2

      const frame = await createImageBitmap(
        img,
        offsetX,
        offsetY,
        cropWidth,
        cropHeight,
        {
          resizeWidth: frameWidth,
          resizeHeight: frameHeight,
        }
      )

      this._frames.push(frame)
    }
  }
}
