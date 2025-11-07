import { Helmet } from 'react-helmet'

import { usePage } from '@shared/config/routing'
import { Header } from '@shared/ui/Header'

export const NotFoundPage = () => {
  usePage({})

  return (
    <div className="App">
      <Helmet>
        <meta charSet="utf-8" />
        <title>404</title>
        <meta name="description" content="Страница не найдена" />
      </Helmet>
      <Header />
      Страница не найдена!
    </div>
  )
}
