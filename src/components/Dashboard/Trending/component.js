import MoviesList from 'src/components/MoviesList'
import Loading from 'src/components/UI/Loading'
import Error from 'src/components/UI/Error'
import useContainer from './hook'

const Trending = () => {
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

export default Trending
