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
  isLoading: boolean
  movies?: IMoviesList
}

export type SearchResultProps = {
  query: Query
}
