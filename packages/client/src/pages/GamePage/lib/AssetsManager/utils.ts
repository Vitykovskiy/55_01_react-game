export async function loadImage(src: string): Promise<HTMLImageElement> {
  const image = new Image()
  image.src = src

  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve()
    image.onerror = () =>
      reject(new Error(`Ошибка загрузки изображения: ${image.src}`))
  })

  return image
}
/**
 * Конвертация угла в радианах в угол ассетов (смещение на Pi/2 + конвертация в градусы)
 */
export function convertAngleToAssetsAngle(angle: number): number {
  return Math.floor(((angle + Math.PI / 2) / Math.PI) * 180) % 360
}
