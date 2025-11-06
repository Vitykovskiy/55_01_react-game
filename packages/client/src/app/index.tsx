import { store } from '@shared/config/routing'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { StrictMode } from 'react'
import { App } from './App'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
)
