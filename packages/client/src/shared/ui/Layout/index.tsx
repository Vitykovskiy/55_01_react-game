import classNames from 'classnames'
import { PropsWithChildren, ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import s from './style.module.scss'

type LayoutVariant = 'default' | 'center'

type LayoutStyle = {
  layout?: string
  main?: string
  content?: string
}

type LayoutProps = PropsWithChildren<{
  variant?: LayoutVariant
  title: string
  description?: string
  bottomPanel?: ReactNode
  classNamesLayoutComponents?: LayoutStyle
}>

const Layout = ({
  variant = 'default',
  title,
  description,
  children,
  bottomPanel,
  classNamesLayoutComponents,
}: LayoutProps) => {
  return (
    <div
      className={classNames(
        s.layout,
        s[variant],
        classNamesLayoutComponents?.layout
      )}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta
          name="description"
          content={description || 'Страница приложения'}
        />
      </Helmet>
      <main className={classNames(s.main, classNamesLayoutComponents?.main)}>
        <div
          className={classNames(
            s.mainContent,
            classNamesLayoutComponents?.content
          )}>
          {children}
        </div>
        {bottomPanel && <div className={s.bottomPanel}>{bottomPanel}</div>}
      </main>
    </div>
  )
}

export default Layout
