import { ErrorMsg } from 'src/interfaces/global.interface'
import { IMovieDetailsExtended } from 'src/interfaces/movie.interface'

export type MovieDetailsHookReturn = {
  error: ErrorMsg
  handleFavoriteClick: () => void
  handleWatchlistClick: () => void
  loading: boolean
  movie: IMovieDetailsExtended | undefined
  popoverOpen: boolean
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type MovieDetailsRouteParams = {
  movieSlug: string
}
