import { ErrorMsg } from 'src/interfaces/global.interface'
import { IMovieDetailsEx } from 'src/interfaces/movie.interface'

export type MovieDetailsHookReturn = {
  error: ErrorMsg
  handleFavoriteClick: () => void
  handleGoToCast: () => void
  handlePopoverMouseEnter: () => void
  handleWatchlistClick: () => void
  isLoading: boolean
  movie?: IMovieDetailsEx
  popoverOpen: boolean
  sessionId: null | string
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type MovieDetailsRouteParams = {
  movieSlug: string
}
