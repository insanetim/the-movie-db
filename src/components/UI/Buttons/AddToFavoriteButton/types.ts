import { MouseEventHandler } from 'react'

export type AddToFavoriteButtonProps = {
  handleClick: MouseEventHandler<HTMLElement>
  inFavorite: boolean
}
