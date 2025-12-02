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
