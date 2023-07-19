import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from 'src/hooks/useRedux'
import { fetchTrending } from 'src/store/dashboard/actions'
import { trendingErrorSelector, trendingLoadingSelector, trendingMoviesSelector } from 'src/store/dashboard/selectors'

import { TrendingHook } from './types'

const useContainer = (): TrendingHook => {
  const dispatch = useAppDispatch()
  const movies = useAppSelector(trendingMoviesSelector)
  const loading = useAppSelector(trendingLoadingSelector)
  const error = useAppSelector(trendingErrorSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'

  const handlePagination = (page: number) => {
    setSearchParams(new URLSearchParams({ page: page.toString() }))
  }

  useEffect(() => {
    dispatch(fetchTrending(page))
  }, [page, dispatch])

  return { error, handlePagination, loading, movies }
}

export default useContainer
