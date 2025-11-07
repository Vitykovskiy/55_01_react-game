import { ThemeProvider } from '@gravity-ui/uikit'
import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routes } from './routes'

const router = createBrowserRouter(routes)

export const App = () => {
  return (
    <ThemeProvider theme="light">
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}
