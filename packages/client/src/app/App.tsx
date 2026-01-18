import { ThemeProvider } from '@gravity-ui/uikit'
import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'
import { ErrorBoundary } from '@shared/ui/ErrorBoundary'
import { useEffect } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { startServiceWorker } from './lib/serviceWorker/helper'
import { routes } from './routes'

export const App = () => {
  const router =
    typeof window !== 'undefined' ? createBrowserRouter(routes) : null

  useEffect(() => {
    startServiceWorker()
  }, [])

  if (!router) {
    return null
  }

  return (
    <ThemeProvider theme="light">
      <ErrorBoundary>
        <RouterProvider router={router} />
      </ErrorBoundary>
    </ThemeProvider>
  )
}
