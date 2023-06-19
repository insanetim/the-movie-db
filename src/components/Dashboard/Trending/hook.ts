import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { fetchTrending, setTrendingPage } from 'src/store/dashboard/actions'
import {
  trendingErrorSelector,
  trendingLoadingSelector,
  trendingMoviesSelector,
  trendingPageSelector
} from 'src/store/dashboard/selectors'

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

  return { error, handlePagination, loading, movies }
}

export default useContainer
