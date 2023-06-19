import type { IMovieDetailExtended } from 'src/interfaces/movie.interface'

export interface MovieDetailHook {
  error: null | string
  handleFavoriteClick: () => void
  handleWatchlistClick: () => void
  loading: boolean
  movie: IMovieDetailExtended | null
  popoverOpen: boolean
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>
}
