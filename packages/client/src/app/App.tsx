import { ThemeProvider } from '@gravity-ui/uikit'
import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'
import { ErrorBoundary } from '@shared/ui/ErrorBoundary'

const router = createBrowserRouter(routes)

export const App = () => {
  // sw
  async function startServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', async () => {
        // try {
        //   const registration = await navigator.serviceWorker.register("/sw.js");
        //   if (registration.installing) {
        //     // window.location.reload()
        //     console.log("Service worker installing");
        //   } else if (registration.waiting) {
        //     // window.location.reload()
        //     console.log("Service worker installed");
        //   } else if (registration.active) {
        //     console.log("Service worker active");
        //   }
        // } catch (error) {
        //   console.log('ServiceWorker registration failed: ', error)
        // }
        navigator.serviceWorker
          .register('./sw.js')
          .then(registration => {
            console.log(
              'ServiceWorker registration successful with scope: ',
              registration.scope
            )
            // window.location.reload()
            // return registration
          })
          // .then((registration) => {
          //   console.log(registration)
          //   if (registration) {
          //     console.log(registration.active?.state)
          //     // window.location.reload()
          //   }
          // })
          .catch((error: string) => {
            console.log('ServiceWorker registration failed: ', error)
          })
      })
    }
  }

  startServiceWorker()

  console.log(
    caches
      .keys()
      .then(cacheNames => {
        return Promise.all(cacheNames)
      })
      .then(data => {
        console.log(data)
      })
  )
  //

  return (
    <ThemeProvider theme="light">
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeProvider>
  )
}
