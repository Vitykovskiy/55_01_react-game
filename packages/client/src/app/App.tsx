import { ThemeProvider } from '@gravity-ui/uikit'
import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'
import { ErrorBoundary } from '@shared/ui/ErrorBoundary'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { startServiceWorker } from './lib/serviceWorker/helper'
import { routes } from './routes'

const router = createBrowserRouter(routes)

export const App = () => {
  startServiceWorker()

  return (
    <ThemeProvider theme="light">
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeProvider>
  )
}
