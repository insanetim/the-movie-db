import { useParams } from 'react-router-dom'
import { useGetMovieDetailsQuery } from 'src/store/features/movies'
import errorMessage from 'src/utils/helpers/errorMessage'
import getIdFromSlug from 'src/utils/helpers/getIdFromSlug'

import { CastHookReturn, CastRouteParams } from '../Cast/types'

const useContainer = (): CastHookReturn => {
  const { movieSlug } = useParams<keyof CastRouteParams>() as CastRouteParams
  const movieId = getIdFromSlug(movieSlug)

  const { data: movie, error, isLoading } = useGetMovieDetailsQuery(movieId)

  return { error: errorMessage(error), isLoading, movie, movieSlug }
}

export default useContainer
