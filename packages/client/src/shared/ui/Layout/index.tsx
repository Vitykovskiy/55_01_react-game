import classNames from 'classnames'
import { PropsWithChildren, ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import s from './style.module.scss'

type LayoutVariant = 'default' | 'center'
type LayoutAlignItems = 'center' | 'flex-start' | 'flex-end'

type LayoutProps = PropsWithChildren<{
  variant?: LayoutVariant
  title: string
  description?: string
  bottomPanel?: ReactNode
  withBottomPadding?: boolean
  alignItems?: LayoutAlignItems
}>

const Layout = ({
  variant = 'default',
  title,
  description,
  children,
  bottomPanel,
  withBottomPadding = true,
  alignItems = 'center',
}: LayoutProps) => {
  const alignClassName = {
    center: s.alignCenter,
    'flex-start': s.alignFlexStart,
    'flex-end': s.alignFlexEnd,
  }[alignItems]

  return (
    <div
      className={classNames(s.layout, s[variant], alignClassName, {
        [s.noBottomPadding]: !withBottomPadding,
      })}>
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
