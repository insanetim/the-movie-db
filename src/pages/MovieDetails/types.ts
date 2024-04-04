import { ErrorMsg } from 'src/interfaces/global.interface'
import { IMovieDetailsExtended } from 'src/interfaces/movie.interface'

export type MovieDetailsHookReturn = {
  error: ErrorMsg
  handleFavoriteClick: () => void
  handleGoToCast: () => void
  handlePopoverMouseEnter: () => void
  handleWatchlistClick: () => void
  loading: boolean
  movie?: IMovieDetailsExtended
  popoverOpen: boolean
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type MovieDetailsRouteParams = {
  movieSlug: string
}
