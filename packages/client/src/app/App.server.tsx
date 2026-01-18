import { ThemeProvider } from '@gravity-ui/uikit'
import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'
import { ErrorBoundary } from '@shared/ui/ErrorBoundary'
import { HelmetProvider, HelmetServerState } from 'react-helmet-async'
import {
  StaticRouterProvider,
  StaticRouterProviderProps,
} from 'react-router-dom/server'

interface AppServerProps {
  router: StaticRouterProviderProps['router']
  context: StaticRouterProviderProps['context']
  helmetContext: { helmet?: HelmetServerState }
}

export const AppServer = ({
  router,
  context,
  helmetContext,
}: AppServerProps) => {
  return (
    <HelmetProvider context={helmetContext}>
      <ThemeProvider theme="light">
        <ErrorBoundary>
          <StaticRouterProvider router={router} context={context} />
        </ErrorBoundary>
      </ThemeProvider>
    </HelmetProvider>
  )
}
