import { ErrorMsg } from 'src/interfaces/global.interface'
import { IMovieDetailExtended } from 'src/interfaces/movie.interface'

export type MovieDetailHook = {
  error: ErrorMsg
  handleFavoriteClick: () => void
  handleWatchlistClick: () => void
  loading: boolean
  movie: IMovieDetailExtended | undefined
  popoverOpen: boolean
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export type MovieDetailRouteParams = {
  movieId: string
}
