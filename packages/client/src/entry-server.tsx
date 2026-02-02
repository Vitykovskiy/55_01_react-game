import { Request as ExpressRequest } from 'express'
import ReactDOM from 'react-dom/server'
import { HelmetProvider, HelmetServerState } from 'react-helmet-async'
import { Provider } from 'react-redux'
import { matchRoutes } from 'react-router-dom'
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server'
import { ServerStyleSheet } from 'styled-components'
import { configureStore } from '@reduxjs/toolkit'
import { routes } from './app/routes'
import { reducer } from './app/store'
import {
  createContext,
  createFetchRequest,
  createUrl,
} from './entry-server.utils'
import { setPageHasBeenInitializedOnServer } from './shared/config'

export const render = async (req: ExpressRequest) => {
  const { query, dataRoutes } = createStaticHandler(routes)
  const fetchRequest = createFetchRequest(req)
  const context = await query(fetchRequest)

  if (context instanceof Response) {
    throw context
  }

  const store = configureStore({ reducer })

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
  } catch (error) {
    console.error('Инициализация страницы произошла с ошибкой', error)
  }

  store.dispatch(setPageHasBeenInitializedOnServer(true))

  const router = createStaticRouter(dataRoutes, context)
  const sheet = new ServerStyleSheet()
  const helmetContext: { helmet?: HelmetServerState } = {}

  try {
    const html = ReactDOM.renderToString(
      sheet.collectStyles(
        <HelmetProvider context={helmetContext}>
          <Provider store={store}>
            <StaticRouterProvider router={router} context={context} />
          </Provider>
        </HelmetProvider>
      )
    )

    const { helmet } = helmetContext
    const styleTags = sheet.getStyleTags()

    return {
      html,
      initialState: store.getState(),
      helmet: helmet || {},
      styleTags,
    }
  } finally {
    sheet.seal()
  }
}
