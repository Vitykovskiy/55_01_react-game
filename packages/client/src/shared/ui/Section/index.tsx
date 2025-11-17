import classNames from 'classnames'
import { PropsWithChildren } from 'react'
import s from './style.module.scss'

type SectionStyle = { section?: string }

type SectionProps = PropsWithChildren<{
  orientation?: 'column' | 'row'
  classNamesSectionComponents?: SectionStyle
}>

const Section = ({
  children,
  orientation = 'column',
  classNamesSectionComponents,
}: SectionProps) => {
  return (
    <section
      className={classNames(
        s.section,
        orientation === 'row' && s.row,
        classNamesSectionComponents?.section
      )}>
      {children}
    </section>
  )
}

export default Section
