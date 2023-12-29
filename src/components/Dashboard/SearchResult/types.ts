import {
  ErrorMsg,
  HandlePagination,
  Query,
} from 'src/interfaces/global.interface'
import { IMoviesList } from 'src/interfaces/movie.interface'

export type SearchResultProps = {
  query: Query
}

export type SearchResultHookProps = SearchResultProps

export type SearchResultHook = {
  error: ErrorMsg
  handlePagination: HandlePagination
  loading: boolean
  movies: IMoviesList | null
}
