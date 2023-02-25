import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchTrending, setTrendingPage } from 'src/state/dashboard/actions'
import {
  trendingMoviesSelector,
  trendingPageSelector,
  trendingLoadingSelector,
  trendingErrorSelector
} from 'src/state/dashboard/selectors'

const useContainer = () => {
  const dispatch = useDispatch()
  const movies = useSelector(trendingMoviesSelector)
  const page = useSelector(trendingPageSelector)
  const loading = useSelector(trendingLoadingSelector)
  const error = useSelector(trendingErrorSelector)

  const handlePagination = nextPage => {
    dispatch(setTrendingPage(nextPage))
  }

  useEffect(() => {
    dispatch(fetchTrending(page))
  }, [page])

  return { movies, loading, error, handlePagination }
}

export default useContainer
