import { useSearchParams } from 'react-router-dom'
import { selectAccount } from 'src/store/features/auth'
import { useGetSearchMoviesQuery } from 'src/store/features/dashboard'
import { useAppSelector } from 'src/store/hooks'
import errorMessage from 'src/utils/helpers/errorMessage'
import getParams from 'src/utils/helpers/getParams'

import { SearchResultHookProps, SearchResultHookReturn } from './types'

const useContainer = ({
  query,
}: SearchResultHookProps): SearchResultHookReturn => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page') || '1'
  const account = useAppSelector(selectAccount)

  const {
    data: movies,
    error,
    isLoading,
  } = useGetSearchMoviesQuery({
    include_adult: account?.include_adult,
    page,
    query,
  })

  const handlePagination = (page: number) => {
    setSearchParams(getParams({ page, search: query }))
  }

  return { error: errorMessage(error), handlePagination, isLoading, movies }
}

export default useContainer
