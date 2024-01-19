import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from 'src/hooks/useRedux'
import { fetchTrending } from 'src/store/dashboard/actions'
import {
  dashboardErrorSelector,
  dashboardLoadingSelector,
  dashboardMoviesSelector,
} from 'src/store/dashboard/selectors'
import getParams from 'src/utils/helpers/getParams'

import { TrendingHookReturn } from './types'

const useContainer = (): TrendingHookReturn => {
  const dispatch = useAppDispatch()
  const movies = useSelector(dashboardMoviesSelector)
  const loading = useSelector(dashboardLoadingSelector)
  const error = useSelector(dashboardErrorSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'

  const handlePagination = (page: number) => {
    setSearchParams(getParams({ page }))
  }

  useEffect(() => {
    dispatch(fetchTrending(page))
  }, [dispatch, page])

  return { error, handlePagination, loading, movies }
}

export default useContainer
