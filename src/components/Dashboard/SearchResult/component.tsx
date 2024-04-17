import { isEmpty, isNil } from 'ramda'
import MoviesList from 'src/components/Movies/MoviesList'
import Empty from 'src/components/UI/Empty'
import Error from 'src/components/UI/Error'
import Loading from 'src/components/UI/Loading'
import Pagination from 'src/components/UI/Pagination'

import useContainer from './hook'
import { SearchResultProps } from './types'

const SearchResult: React.FC<SearchResultProps> = ({ query }) => {
  const { error, handlePagination, loading, movies } = useContainer({ query })

  if (loading || isNil(movies)) {
    return <Loading />
  }

  if (error) {
    return <Error error={error} />
  }

  if (isEmpty(movies.results)) {
    return <Empty description='No movies found' />
  }

  return (
    <>
      <MoviesList movies={movies.results} />
      {movies.total_pages > 1 && (
        <Pagination
          current={movies.page}
          onChange={handlePagination}
          pageSize={20}
          total={movies.total_results}
        />
      )}
    </>
  )
}

export default SearchResult
