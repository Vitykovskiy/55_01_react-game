import { configureStore } from '@reduxjs/toolkit'
import { Request as ExpressRequest } from 'express'
import ReactDOM from 'react-dom/server'
import { Helmet } from 'react-helmet'
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
import {
  reducer,
  setPageHasBeenInitializedOnServer,
} from './shared/config/routing'

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
  //     dispatch: index.dispatch,
  //     state: index.getState(),
  //     ctx: createContext(req),
  //   })
  // } catch (e) {
  //   console.log('Инициализация страницы произошла с ошибкой', e)
  // }

  store.dispatch(setPageHasBeenInitializedOnServer(true))

  const router = createStaticRouter(dataRoutes, context)
  const sheet = new ServerStyleSheet()
  try {
    const html = ReactDOM.renderToString(
      sheet.collectStyles(
        <Provider store={store}>
          <StaticRouterProvider router={router} context={context} />
        </Provider>
      )
    )

    const styleTags = sheet.getStyleTags()

    const helmet = Helmet.renderStatic()

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
