import React from 'react'
import { isEmpty } from 'lodash'

import Loading from 'src/components/Loading'
import MoviesList from 'src/components/MoviesList'
import { useContainer } from './hook'

const DashboardTrending = () => {
  const { movies, handlePagination } = useContainer()

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

export default DashboardTrending
