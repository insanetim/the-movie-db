import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import Loading from 'src/components/Loading'
import MoviesList from 'src/components/MoviesList'
import { useContainer } from './hook'

const DashboardSearchResult = ({ movies }) => {
  const { handlePagination } = useContainer()

  if (isEmpty(movies)) {
    return <Loading />
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
  movies: PropTypes.shape({
    page: PropTypes.number,
    results: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        overview: PropTypes.string,
        poster_path: PropTypes.string
      })
    ),
    total_pages: PropTypes.number,
    total_results: PropTypes.number
  })
}

DashboardSearchResult.defaultProps = {
  movies: {}
}

export default DashboardSearchResult
