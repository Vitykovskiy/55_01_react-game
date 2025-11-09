import classNames from 'classnames'
import { PropsWithChildren, ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import s from './style.module.scss'

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
    <div className={classNames(s.layout, s[variant])}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta
          name="description"
          content={description || 'Страница приложения'}
        />
      </Helmet>
      <main className={s.main}>
        <div className={s.mainContent}>{children}</div>
        {bottomPanel && <div className={s.bottomPanel}>{bottomPanel}</div>}
      </main>
    </div>
  )
}

export default Layout
