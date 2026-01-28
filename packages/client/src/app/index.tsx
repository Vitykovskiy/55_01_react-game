import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AppProviders } from './AppProviders'
import { routes } from './routes'
import { store } from './store'
import './index.scss'

const router = createBrowserRouter(routes)

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <HelmetProvider>
      <AppProviders store={store}>
        <RouterProvider router={router} />
      </AppProviders>
    </HelmetProvider>
  </StrictMode>
)
