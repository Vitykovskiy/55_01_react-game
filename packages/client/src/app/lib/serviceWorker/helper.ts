export const startServiceWorker = async () => {
  if (!navigator?.serviceWorker) {
    return console.log(
      'Браузер не поддерживает сервис воркеры, оффлайн режим не доступен'
    )
  }

  window.addEventListener('load', async () => {
    try {
      const registration = await navigator.serviceWorker.register('./sw.js')
      console.log(
        'ServiceWorker registration successful with scope: ',
        registration.scope
      )
    } catch (error: unknown) {
      console.log('ServiceWorker registration failed: ', error)
    }
  })
}
