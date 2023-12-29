import { MouseEventHandler, ReactNode } from 'react'

export type IconButtonProps = {
  handleClick?: MouseEventHandler<HTMLElement>
  icon: ReactNode
}
