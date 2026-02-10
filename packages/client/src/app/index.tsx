import ReactDOM from 'react-dom/client'
import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { createBrowserRouter } from 'react-router-dom'
import { AppProviders } from './AppProviders'
import { routes } from './routes'
import { store } from './store'
import './index.scss'
import { App } from './App'

const router = createBrowserRouter(routes)

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <HelmetProvider>
      <AppProviders store={store}>
        <App router={router} />
      </AppProviders>
    </HelmetProvider>
  </StrictMode>
)
