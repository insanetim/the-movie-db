import type { IMovieDetailExtended } from 'src/interfaces/movie.interface'

export interface MovieDetailHook {
  movie: IMovieDetailExtended | null
  loading: boolean
  error: string | null
  handleFavoriteClick: () => void
  handleWatchlistClick: () => void
  popoverOpen: boolean
  setPopoverOpen: React.Dispatch<React.SetStateAction<boolean>>
}
