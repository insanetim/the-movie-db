import { useEffect } from 'react'

import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import {
  trendingMoviesSelector,
  trendingPageSelector,
  trendingLoadingSelector,
  trendingErrorSelector
} from 'src/store/dashboard/selectors'
import { fetchTrending, setTrendingPage } from 'src/store/dashboard/actions'
import { TrendingHook } from './types'

const useContainer = (): TrendingHook => {
  const dispatch = useAppDispatch()
  const movies = useAppSelector(trendingMoviesSelector)
  const page = useAppSelector(trendingPageSelector)
  const loading = useAppSelector(trendingLoadingSelector)
  const error = useAppSelector(trendingErrorSelector)

  const handlePagination = (page: number) => {
    dispatch(setTrendingPage(page))
  }

  useEffect(() => {
    dispatch(fetchTrending(page))
  }, [page, dispatch])

  return { movies, loading, error, handlePagination }
}

export default useContainer
