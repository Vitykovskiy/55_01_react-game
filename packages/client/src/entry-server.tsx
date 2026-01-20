import { configureStore } from '@reduxjs/toolkit'
import { Request as ExpressRequest } from 'express'
import ReactDOM from 'react-dom/server'
import { Provider } from 'react-redux'
import { matchRoutes } from 'react-router-dom'
import {
  createStaticHandler,
  createStaticRouter,
} from 'react-router-dom/server'
import { ServerStyleSheet } from 'styled-components'

import { routes } from './app/routes'
import { reducer } from './app/store'
import {
  createContext,
  createFetchRequest,
  createUrl,
} from './entry-server.utils'
import { setPageHasBeenInitializedOnServer } from './shared/config'
import { HelmetProvider } from 'react-helmet-async'
import { AppServer } from './app/App.server'

export const render = async (req: ExpressRequest) => {
  console.log(55)
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const store = configureStore({
    reducer,
  })

  const url = createUrl(req)

  const foundRoutes = matchRoutes(routes, url)
  if (!foundRoutes) {
    throw new Error('Страница не найдена!')
  }

  const [{ route }] = foundRoutes

  try {
    await route.fetchData?.({
      dispatch: store.dispatch,
      state: store.getState(),
      ctx: createContext(req),
    })
  } catch (e) {
    console.log('Инициализация страницы произошла с ошибкой', e)
  }

  store.dispatch(setPageHasBeenInitializedOnServer(true))

  const router = createStaticRouter(dataRoutes, context)
  const sheet = new ServerStyleSheet()

  try {
    const helmetContext: Record<string, HelmetProvider> = {}
    const html = ReactDOM.renderToString(
      sheet.collectStyles(
        <Provider store={store}>
          <AppServer
            router={router}
            context={context}
            helmetContext={helmetContext}
          />
        </Provider>
      )
    )

    const styleTags = sheet.getStyleTags()

    const helmet = helmetContext.helmet || {}

    return {
      html,
      helmet,
      styleTags,
      initialState: store.getState(),
    }
  } finally {
    sheet.seal()
  }
}
