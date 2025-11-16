import classNames from 'classnames'
import { PropsWithChildren, ReactNode } from 'react'
import { Helmet } from 'react-helmet'
import s from './style.module.scss'

type LayoutVariant = 'default' | 'center'

// type LayoutStyleTag = 'divApp' | 'main' | 'divChildren'

type LayoutStyle = { [key: string]: string }

type LayoutProps = PropsWithChildren<{
  variant?: LayoutVariant
  title: string
  description?: string
  bottomPanel?: ReactNode
  style?: LayoutStyle
}>

// const style = {

// }

const Layout = ({
  variant = 'default',
  title,
  description,
  children,
  bottomPanel,
  style,
}: LayoutProps) => {
  // console.log(s)
  return (
    <div className={classNames(s.layout, s[variant], style?.divApp)}>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title}</title>
        <meta
          name="description"
          content={description || 'Страница приложения'}
        />
      </Helmet>
      <main className={classNames(s.main, style?.main)}>
        <div className={classNames(s.mainContent, style?.divChildren)}>
          {children}
        </div>
        {bottomPanel && <div className={s.bottomPanel}>{bottomPanel}</div>}
      </main>
    </div>
  )
}

export default Layout
