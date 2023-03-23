import MoviesList from 'src/components/MoviesList'
import Loading from 'src/components/Loading'
import Error from 'src/components/Error'
import useContainer from './hook'

const DashboardTrending = () => {
  const { movies, loading, error, handlePagination } = useContainer()

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error error={error} />
  }

  return (
    <MoviesList
      movies={movies}
      emptyText='No movies found'
      handlePagination={handlePagination}
    />
  )
}

export default DashboardTrending
