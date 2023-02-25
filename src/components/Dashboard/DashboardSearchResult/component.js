import React from 'react'
import PropTypes from 'prop-types'

import MoviesList from 'src/components/MoviesList'
import Loading from 'src/components/Loading'
import Error from 'src/components/Error'
import useContainer from './hook'

const DashboardSearchResult = ({ searchQuery }) => {
  const { movies, loading, error, handlePagination } = useContainer(searchQuery)

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

DashboardSearchResult.propTypes = {
  searchQuery: PropTypes.string
}

DashboardSearchResult.defaultProps = {
  searchQuery: null
}

export default DashboardSearchResult
