import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchSearch } from 'src/store/dashboard/actions'
import {
  dashboardErrorSelector,
  dashboardLoadingSelector,
  dashboardMoviesSelector,
} from 'src/store/dashboard/selectors'
import { useAppDispatch, useAppSelector } from 'src/store/hooks'
import getParams from 'src/utils/helpers/getParams'

import { SearchResultHookProps, SearchResultHookReturn } from './types'

const useContainer = ({
  query,
}: SearchResultHookProps): SearchResultHookReturn => {
  const dispatch = useAppDispatch()
  const movies = useAppSelector(dashboardMoviesSelector)
  const loading = useAppSelector(dashboardLoadingSelector)
  const error = useAppSelector(dashboardErrorSelector)
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'

  const handlePagination = (page: number) => {
    setSearchParams(getParams({ page, search: query }))
  }

  useEffect(() => {
    dispatch(fetchSearch({ page, query }))
  }, [dispatch, page, query])

  return { error, handlePagination, loading, movies }
}

export default useContainer
