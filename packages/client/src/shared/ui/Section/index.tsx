import classNames from 'classnames'
import { PropsWithChildren } from 'react'
import s from './style.module.scss'

type SectionProps = PropsWithChildren<{
  orientation?: 'column' | 'row'
}>

const Section = ({ children, orientation = 'column' }: SectionProps) => {
  return (
    <section className={classNames(s.section, orientation === 'row' && s.row)}>
      {children}
    </section>
  )
}

export default Section
