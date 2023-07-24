import { Helmet } from 'react-helmet'
import MoviesList from 'src/components/Movies/MoviesList'
import Empty from 'src/components/UI/Empty'
import Error from 'src/components/UI/Error'
import Loading from 'src/components/UI/Loading'
import PageTitle from 'src/components/UI/PageTitle'
import Pagination from 'src/components/UI/Pagination'
import isNull from 'src/utils/helpers/isNull'
import metaTitle from 'src/utils/helpers/metaTitle'

import useContainer from './hook'

const Favorite: React.FC = () => {
  const { error, handleMovieDelete, handlePagination, loading, movies } = useContainer()

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
          handleMovieDelete={handleMovieDelete}
          movies={movies.results}
        />
        {movies.total_pages > 1 && (
          <Pagination
            current={movies.page}
            onChange={handlePagination}
            pageSize={20}
            total={movies.total_results}
          />
        )}
      </>
    )
  }

  return (
    <>
      <Helmet title={metaTitle('Favorite')} />
      <div className='container'>
        <PageTitle>Favorite</PageTitle>
        {content}
      </div>
    </>
  )
}

export default Favorite
