import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import useRequest from 'src/hooks/useRequest'
import { fetchSearch } from 'src/store/dashboard/actions'
import { dashboardMoviesSelector } from 'src/store/dashboard/selectors'
import getParams from 'src/utils/helpers/getParams'

import { SearchResultHookProps, SearchResultHookReturn } from './types'

const useContainer = ({
  query,
}: SearchResultHookProps): SearchResultHookReturn => {
  const movies = useSelector(dashboardMoviesSelector)
  const { error, loading, request } = useRequest()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'

  const handlePagination = (page: number) => {
    setSearchParams(getParams({ page, search: query }))
  }

  useEffect(() => {
    request(fetchSearch({ page, query }))
  }, [page, query, request])

  return { error, handlePagination, loading, movies }
}

export default useContainer
