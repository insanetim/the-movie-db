import { IMoviesList } from 'src/interfaces/movie.interface'

export interface SearchResultProps {
  query: string
}

export interface SearchResultHookProps extends SearchResultProps {}

export interface SearchResultHook {
  error: null | string
  handlePagination: (page: number) => void
  loading: boolean
  movies: IMoviesList | null
}
