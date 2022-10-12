import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import DashboardContent from 'src/components/Dashboard/DashboardContent'
import DashboardLoading from 'src/components/Dashboard/DashboardLoading'
import Pagination from 'src/components/Pagination'
import { useContainer } from './hook'

const DashboardTrending = ({ movies }) => {
  const { handleChange } = useContainer()

  if (isEmpty(movies)) {
    return <DashboardLoading />
  }

  return (
    <>
      <DashboardContent movies={movies.results} />
      {movies.total_pages > 1 && (
        <Pagination
          current={movies.page}
          pageSize={20}
          total={movies.total_results}
          onChange={handleChange}
        />
      )}
    </>
  )
}

DashboardTrending.propTypes = {
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

DashboardTrending.defaultProps = {
  movies: {}
}

export default DashboardTrending
