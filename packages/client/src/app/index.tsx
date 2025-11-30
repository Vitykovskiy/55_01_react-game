import { store } from '@shared/config/routing'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { StrictMode } from 'react'
import { App } from './App'
import './index.scss'
import { userStore } from '../entities/user'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <Provider store={userStore}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  </Provider>
)
