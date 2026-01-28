import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { ReactNode } from 'react'

type AppRouter = ReturnType<typeof createBrowserRouter>

interface AppProps {
  children?: ReactNode
  router?: AppRouter
}

export const App = ({ children, router }: AppProps) => {
  if (router) {
    return <RouterProvider router={router} />
  }

  return <>{children}</>
}
