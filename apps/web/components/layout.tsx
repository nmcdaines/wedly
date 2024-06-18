import { cx } from 'class-variance-authority'
import { PropsWithChildren } from 'react'

type LayoutProps = {
  className?: string
}

const Layout = ({ children, className }: PropsWithChildren<LayoutProps>) => {
  return (
    <div className={cx('w-full ml-auto mr-auto max-w-screen-xl', className)}>
      {children}
    </div>
  )
}

export { Layout }
