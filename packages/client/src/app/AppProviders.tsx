import { ThemeProvider } from '@gravity-ui/uikit'
import '@gravity-ui/uikit/styles/fonts.css'
import '@gravity-ui/uikit/styles/styles.css'
import { ErrorBoundary } from '@shared/ui/ErrorBoundary'
import { Provider } from 'react-redux'
import { ReactNode } from 'react'

interface AppProvidersProps {
  children: ReactNode
  store: any
  theme?: string
}

export const AppProviders = ({
  children,
  store,
  theme = 'light',
}: AppProvidersProps) => {
  return (
    <Provider store={store}>
      <ErrorBoundary>
        <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </ErrorBoundary>
    </Provider>
  )
}
