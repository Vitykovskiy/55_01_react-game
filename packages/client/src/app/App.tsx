import { ThemeProvider } from '@gravity-ui/uikit'
import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { ErrorBoundary } from '@shared/ui/ErrorBoundary'

const router = createBrowserRouter(routes)

export const App = () => {
  // async function startServiceWorker() {

  //   if (!navigator?.serviceWorker) {
  //     return;
  //   }

  //   window.addEventListener('load', async () => {
  //     try {
  //       const registration = await navigator.serviceWorker.register('./sw.js')
  //       console.log(
  //         'ServiceWorker registration successful with scope: ',
  //         registration.scope
  //       )
  //     } catch (error: unknown) {
  //       console.log('ServiceWorker registration failed: ', error)
  //     }
  //   })
  // }

  // startServiceWorker()

  return (
    <ThemeProvider theme="light">
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeProvider>
  )
}
