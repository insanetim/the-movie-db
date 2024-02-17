import { ErrorMsg } from 'src/interfaces/global.interface'
import { IMovieDetailsExtended } from 'src/interfaces/movie.interface'

export type CastHookReturn = {
  error: ErrorMsg
  loading: boolean
  movie: IMovieDetailsExtended | undefined
  movieSlug: string
}

export type CastRouteParams = {
  movieSlug: string
}
