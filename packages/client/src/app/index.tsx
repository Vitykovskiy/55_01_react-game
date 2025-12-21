import { store } from '@shared/config'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { App } from './App'
import './index.scss'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <StrictMode>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </StrictMode>
  </Provider>
)
