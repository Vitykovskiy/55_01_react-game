import styles from './style.module.scss'
import { PropsWithChildren, ReactNode } from 'react'
import { Helmet } from 'react-helmet'

type LayoutVariant = 'default' | 'center'

type LayoutProps = PropsWithChildren<{
  variant?: LayoutVariant
  title: string
  description?: string
  bottomPanel?: ReactNode
}>

const Layout = ({
  variant = 'default',
  title,
  description,
  children,
  bottomPanel,
}: LayoutProps) => {
  return (
    <div className={`${styles.layout} ${styles[`layout--${variant}`]}`}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta
          name="description"
          content={description || 'Страница приложения'}
        />
      </Helmet>
      <main className={styles.main}>
        <div className={styles.mainContent}>{children}</div>
        {bottomPanel && <div className={styles.bottomPanel}>{bottomPanel}</div>}
      </main>
    </div>
  )
}

export default Layout
