import { MouseEventHandler } from 'react'

export type AddToWatchlistButtonProps = {
  handleClick: MouseEventHandler<HTMLElement>
  inWatchlist: boolean
}
