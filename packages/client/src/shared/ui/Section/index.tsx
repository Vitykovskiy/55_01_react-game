import classNames from 'classnames'
import { CSSProperties, PropsWithChildren } from 'react'
import s from './style.module.scss'

type SectionStyle = { section?: string }

type SectionProps = PropsWithChildren<{
  orientation?: 'column' | 'row'
  pb?: boolean
  alignItems?: 'stretch' | 'flex-start' | 'center' | 'flex-end'
  classNamesSectionComponents?: SectionStyle
}>

const Section = ({
  children,
  orientation = 'column',
  pb,
  alignItems = 'stretch',
  classNamesSectionComponents,
}: SectionProps) => {
  const isRow = orientation === 'row'
  const alignmentStyle: CSSProperties = {
    alignItems,
  }

  return (
    <section
      className={classNames(
        s.section,
        { [s.row]: isRow, [s.pb]: pb },
        classNamesSectionComponents?.section
      )}
      style={alignmentStyle}
    >
      {children}
    </section>
  )
}

export default Section
