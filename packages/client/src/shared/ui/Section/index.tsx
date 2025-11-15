import classNames from 'classnames'
import { CSSProperties, PropsWithChildren } from 'react'
import s from './style.module.scss'

type SectionProps = PropsWithChildren<{
  orientation?: 'column' | 'row'
  pb?: boolean
  alignItems?: 'stretch' | 'flex-start' | 'center' | 'flex-end'
}>

const Section = ({
  children,
  orientation = 'column',
  pb,
  alignItems = 'stretch',
}: SectionProps) => {
  const isRow = orientation === 'row'
  const alignmentStyle: CSSProperties = {
    alignItems,
  }

  return (
    <section
      className={classNames(s.section, isRow && s.row, pb && s.pb)}
      style={alignmentStyle}>
      {children}
    </section>
  )
}

export default Section
