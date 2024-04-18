import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useAppDispatch } from 'src/hooks/useRedux'
import { fetchSearch } from 'src/store/dashboard/actions'
import {
  dashboardErrorSelector,
  dashboardLoadingSelector,
  dashboardMoviesSelector,
} from 'src/store/dashboard/selectors'
import getParams from 'src/utils/helpers/getParams'

import { SearchResultHookProps, SearchResultHookReturn } from './types'

const useContainer = ({
  query,
}: SearchResultHookProps): SearchResultHookReturn => {
  const dispatch = useAppDispatch()
  const movies = useSelector(dashboardMoviesSelector)
  const loading = useSelector(dashboardLoadingSelector)
  const error = useSelector(dashboardErrorSelector)
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
