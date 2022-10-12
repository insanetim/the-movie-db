import React from 'react'
import PropTypes from 'prop-types'

import DashboardContent from 'src/components/Dashboard/DashboardContent'
import DashboardLoading from 'src/components/Dashboard/DashboardLoading'
import Pagination from 'src/components/Pagination'
import { useContainer } from './hook'

const DashboardTrending = ({ movies }) => {
  const { handleChange } = useContainer()

  if (!movies) {
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
  movies: PropTypes.arrayOf()
}

DashboardTrending.defaultProps = {
  movies: []
}

export default DashboardTrending
