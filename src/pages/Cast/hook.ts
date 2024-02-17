import { isNil } from 'ramda'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useAppDispatch } from 'src/hooks/useRedux'
import { RootState } from 'src/store'
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
  const movie = useSelector((state: RootState) =>
    movieDetailsSelector(state, movieId)
  )
  const loading = useSelector(movieDetailsLoadingSelector)
  const error = useSelector(movieDetailsErrorSelector)

  useEffect(() => {
    if (isNil(movie)) {
      dispatch(fetchMovieDetails(movieId))
    }
  }, [dispatch, movie, movieId])

  return { error, loading, movie, movieSlug }
}

export default useContainer
