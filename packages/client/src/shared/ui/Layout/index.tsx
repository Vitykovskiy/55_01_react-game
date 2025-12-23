import classNames from 'classnames'
import { CSSProperties, PropsWithChildren, ReactNode } from 'react'
import { Helmet } from 'react-helmet-async'
import s from './style.module.scss'

type LayoutVariant = 'default' | 'center'
type LayoutAlignItems = 'center' | 'flex-start' | 'flex-end'

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
  withBottomPadding?: boolean
  style?: CSSProperties
  alignItems?: LayoutAlignItems
}>

const Layout = ({
  variant = 'default',
  title,
  description,
  children,
  bottomPanel,
  classNamesLayoutComponents,
  withBottomPadding = true,
  style,
  alignItems = 'center',
}: LayoutProps) => {
  const alignClassName = {
    center: s.alignCenter,
    'flex-start': s.alignFlexStart,
    'flex-end': s.alignFlexEnd,
  }[alignItems]

  return (
    <div
      className={classNames(
        s.layout,
        s[variant],
        alignClassName,
        classNamesLayoutComponents?.layout,
        {
          [s.noBottomPadding]: !withBottomPadding,
        }
      )}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta
          name="description"
          content={description || 'Страница приложения'}
        />
      </Helmet>
      <main
        className={classNames(s.main, classNamesLayoutComponents?.main)}
        style={style}>
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
