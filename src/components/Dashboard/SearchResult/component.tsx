import type { SearchResultProps } from './types'
import Loading from 'src/components/UI/Loading'
import Error from 'src/components/UI/Error'
import Empty from 'src/components/UI/Empty'
import Pagination from 'src/components/UI/Pagination'
import MoviesList from 'src/components/Movies/MoviesList'
import useContainer from './hook'

const SearchResult: React.FC<SearchResultProps> = ({ query }) => {
  const { movies, loading, error, handlePagination } = useContainer({ query })

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error error={error} />
  }

  if (!movies || movies.results.length === 0) {
    return <Empty description='No movies found' />
  }

  return (
    <>
      <MoviesList movies={movies.results} />
      {movies.total_pages > 1 && (
        <Pagination
          current={movies.page}
          pageSize={20}
          total={movies.total_results}
          onChange={handlePagination}
        />
      )}
    </>
  )
}

export default SearchResult
