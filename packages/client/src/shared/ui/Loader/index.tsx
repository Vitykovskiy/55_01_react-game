import { Loader as UiKitLoader } from '@gravity-ui/uikit'
import { PropsWithChildren } from 'react'
import s from './style.module.scss'
export type PageProps = PropsWithChildren & {
  show: boolean
}

export const Loader = ({ show, children }: PageProps) => {
  if (show) {
    return (
      <div className={s.loaderContainer}>
        <UiKitLoader />
      </div>
    )
  }

  return <>{children}</>
}
