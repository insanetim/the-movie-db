import React from 'react'
import * as R from 'ramda'

import Loading from 'src/components/Loading'
import MoviesList from 'src/components/MoviesList'
import { useContainer } from './hook'

const DashboardSearchResult = () => {
  const { movies, handlePagination } = useContainer()

  if (R.isEmpty(movies)) {
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

export default DashboardSearchResult
