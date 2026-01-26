import { RouterProvider } from 'react-router-dom'
import { ReactNode } from 'react'

interface AppProps {
  children?: ReactNode
  router?: any
}

export const App = ({ children, router }: AppProps) => {
  if (router) {
    return <RouterProvider router={router} />
  }
  return <>{children}</>
}
