import { useSearchParams } from 'react-router-dom'
import { useGetTrendingMoviesQuery } from 'src/store/features/dashboard'
import errorMessage from 'src/utils/helpers/errorMessage'
import getParams from 'src/utils/helpers/getParams'

import { TrendingHookReturn } from './types'

const useContainer = (): TrendingHookReturn => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'

  const { data: movies, error, isLoading } = useGetTrendingMoviesQuery(page)

  const handlePagination = (page: number) => {
    setSearchParams(getParams({ page }))
  }

  return {
    error: errorMessage(error),
    handlePagination,
    isLoading,
    movies,
  }
}

export default useContainer
