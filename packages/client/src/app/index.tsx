import { store } from '@shared/config/store'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'

import { StrictMode } from 'react'
import { App } from './App'
import './index.scss'
import { storeData } from '@entities/storeRedux'

ReactDOM.hydrateRoot(
  document.getElementById('root') as HTMLElement,
  <Provider store={store}>
    <Provider store={storeData}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  </Provider>
)
