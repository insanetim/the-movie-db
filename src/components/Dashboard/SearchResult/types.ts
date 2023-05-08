import type { IMoviesList } from 'src/interfaces/movie.interface'

export interface SearchResultProps {
  query: string
}

export interface SearchResultHookProps extends SearchResultProps {}

export interface SearchResultHook {
  movies: IMoviesList | null
  loading: boolean
  error: string | null
  handlePagination: (page: number) => void
}
