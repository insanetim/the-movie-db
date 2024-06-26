import MoviesList from 'src/components/Movies/MoviesList'
import Empty from 'src/components/UI/Empty'
import Error from 'src/components/UI/Error'
import Loading from 'src/components/UI/Loading'
import Pagination from 'src/components/UI/Pagination'

import useContainer from './hook'

const Trending: React.FC = () => {
  const { error, handlePagination, loading, movies } = useContainer()

  if (loading) {
    return <Loading />
  } else if (error) {
    return <Error error={error} />
  } else if (!movies || movies.results.length === 0) {
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
          total={10000}
        />
      )}
    </>
  )
}

export default Trending
