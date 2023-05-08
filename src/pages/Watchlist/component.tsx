import isNull from 'src/utils/helpers/isNull'
import Loading from 'src/components/UI/Loading'
import Error from 'src/components/UI/Error'
import Empty from 'src/components/UI/Empty'
import PageTitle from 'src/components/UI/PageTitle'
import Pagination from 'src/components/UI/Pagination'
import MoviesList from 'src/components/Movies/MoviesList'
import useContainer from './hook'

const Watchlist: React.FC = () => {
  const { movies, loading, error, handlePagination, handleMovieDelete } = useContainer()

  let content = <Empty />

  if (loading) {
    content = (
      <div className='top-margin'>
        <Loading />
      </div>
    )
  }
  if (error) {
    content = <Error error={error} />
  }
  if (!isNull(movies) && movies.results.length > 0) {
    content = (
      <>
        <MoviesList
          movies={movies.results}
          handleMovieDelete={handleMovieDelete}
        />
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

  return (
    <div className='container'>
      <PageTitle>Watchlist</PageTitle>
      {content}
    </div>
  )
}

export default Watchlist
