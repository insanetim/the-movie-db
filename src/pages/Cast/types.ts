import { ErrorMsg } from 'src/interfaces/global.interface'
import { IMovieDetailsEx } from 'src/interfaces/movie.interface'

export type CastHookReturn = {
  error: ErrorMsg
  isLoading: boolean
  movie?: IMovieDetailsEx
  movieSlug: string
}

export type CastRouteParams = {
  movieSlug: string
}
