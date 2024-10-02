import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import { fetchMovieDetails } from 'src/store/movieDetails/actions'
import {
  movieDetailsErrorSelector,
  movieDetailsLoadingSelector,
  movieDetailsSelector,
} from 'src/store/movieDetails/selectors'
import getIdFromSlug from 'src/utils/helpers/getIdFromSlug'

import { CastHookReturn, CastRouteParams } from '../Cast/types'

const useContainer = (): CastHookReturn => {
  const { movieSlug } = useParams<keyof CastRouteParams>() as CastRouteParams
  const dispatch = useAppDispatch()
  const movieId = getIdFromSlug(movieSlug)
  const movie = useAppSelector(state => movieDetailsSelector(state, movieId))
  const loading = useAppSelector(movieDetailsLoadingSelector)
  const error = useAppSelector(movieDetailsErrorSelector)

  useEffect(() => {
    if (!movie) {
      dispatch(fetchMovieDetails(movieId))
    }
  }, [dispatch, movie, movieId])

  return { error, loading, movie, movieSlug }
}

export default useContainer
