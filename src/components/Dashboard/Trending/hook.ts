import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useAppSelector } from 'src/hooks/useRedux'
import useRequest from 'src/hooks/useRequest'
import { fetchTrending } from 'src/store/dashboard/actions'
import { dashboardMoviesSelector } from 'src/store/dashboard/selectors'
import getParams from 'src/utils/helpers/getParams'

import { TrendingHook } from './types'

const useContainer = (): TrendingHook => {
  const movies = useAppSelector(dashboardMoviesSelector)
  const { error, loading, request } = useRequest()
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') ?? '1'

  const handlePagination = (page: number) => {
    setSearchParams(getParams({ page }))
  }

  useEffect(() => {
    request(fetchTrending(page))
  }, [page, request])

  return { error, handlePagination, loading, movies }
}

export default useContainer
