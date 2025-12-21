import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { StrictMode } from 'react'
import { HelmetProvider } from 'react-helmet-async'
import { App } from './App'
import './index.scss'
import { store } from './store'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </Provider>
  </StrictMode>
)
