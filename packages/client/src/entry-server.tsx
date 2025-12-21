import { configureStore } from '@reduxjs/toolkit'
import { Request as ExpressRequest } from 'express'
import ReactDOM from 'react-dom/server'
import { HelmetProvider } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { matchRoutes } from 'react-router-dom'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { ServerStyleSheet } from 'styled-components'

import { routes } from './app/routes'
import { createFetchRequest, createUrl } from './entry-server.utils'
import { reducer, setPageHasBeenInitializedOnServer } from './shared/config'

export const render = async (req: ExpressRequest) => {
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

  //TODO раскомментировать, когда будем прикручивать SSR
  // const [
  //   {
  //     route: { fetchData },
  //   },
  // ] = foundRoutes

  // try {
  //   await fetchData({
  //     dispatch: store.dispatch,
  //     state: store.getState(),
  //     ctx: createContext(req),
  //   })
  // } catch (e) {
  //   console.log('Инициализация страницы произошла с ошибкой', e)
  // }

  store.dispatch(setPageHasBeenInitializedOnServer(true))

  const router = createStaticRouter(dataRoutes, context)
  const sheet = new ServerStyleSheet()
  try {
    const helmetContext: Record<string, HelmetProvider> = {}
    const html = ReactDOM.renderToString(
      sheet.collectStyles(
        <HelmetProvider context={helmetContext}>
          <Provider store={store}>
            <StaticRouterProvider router={router} context={context} />
          </Provider>
        </HelmetProvider>
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
