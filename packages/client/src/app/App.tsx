import { ThemeProvider } from '@gravity-ui/uikit'
import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { ErrorBoundary } from '@shared/ui/ErrorBoundary'

const router = createBrowserRouter(routes)

export const App = () => {
  // serviceWorker
  async function startServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        navigator.serviceWorker
          .register('./sw.js')
          .then(registration => {
            console.log(
              'ServiceWorker registration successful with scope: ',
              registration.scope
            )
          })
          .catch((error: string) => {
            console.log('ServiceWorker registration failed: ', error)
          })
      })
    }
  }

  startServiceWorker()
  //

  return (
    <ThemeProvider theme="light">
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeProvider>
  )
}
