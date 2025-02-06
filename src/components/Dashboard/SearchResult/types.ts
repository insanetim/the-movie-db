import {
  ErrorMsg,
  HandlePagination,
  Query,
} from 'src/interfaces/global.interface'
import { IMoviesList } from 'src/interfaces/movie.interface'

export type SearchResultHookProps = SearchResultProps

export type SearchResultHookReturn = {
  error: ErrorMsg
  handlePagination: HandlePagination
  loading: boolean
  movies: IMoviesList | null
}

export type SearchResultProps = {
  query: Query
}
