import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ReactNode } from 'react'
import { startServiceWorker } from './lib/serviceWorker/helper'

type AppRouter = ReturnType<typeof createBrowserRouter>

interface AppProps {
  children?: ReactNode
  router?: AppRouter
}

export const App = ({ children, router }: AppProps) => {
  startServiceWorker()

  if (router) {
    return <RouterProvider router={router} />
  }

  return children
}
