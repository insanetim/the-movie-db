import PropTypes from 'prop-types'

import Loading from 'src/components/UI/Loading'
import Error from 'src/components/UI/Error'
import MoviesList from 'src/components/Movies/MoviesList'
import Pagination from 'src/components/UI/Pagination'
import useContainer from './hook'

const SearchResult = ({ searchQuery }) => {
  const { movies, loading, error, handlePagination } = useContainer({ searchQuery })

  if (loading) {
    return <Loading />
  }

  if (error) {
    return <Error error={error} />
  }

  return (
    <>
      <MoviesList
        movies={movies.results}
        emptyText='No movies found'
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

SearchResult.propTypes = {
  searchQuery: PropTypes.string
}

SearchResult.defaultProps = {
  searchQuery: null
}

export default SearchResult
