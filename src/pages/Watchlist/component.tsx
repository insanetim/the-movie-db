import { Typography } from 'antd'
import { Helmet } from 'react-helmet'
import MoviesList from 'src/components/Movies/MoviesList'
import Empty from 'src/components/UI/Empty'
import Error from 'src/components/UI/Error'
import Loading from 'src/components/UI/Loading'
import PageTitle from 'src/components/UI/PageTitle'
import Pagination from 'src/components/UI/Pagination'
import metaTitle from 'src/utils/helpers/metaTitle'

import useContainer from './hook'

const Watchlist: React.FC = () => {
  const { error, handleMovieDelete, handlePagination, isLoading, movies } =
    useContainer()

  let content: JSX.Element
  if (isLoading) {
    content = <Loading />
  } else if (error) {
    content = <Error error={error} />
  } else if (!movies || movies.results.length === 0) {
    content = <Empty />
  } else {
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
      <Helmet title={metaTitle('Watchlist')} />
      <div className='container top-margin'>
        <PageTitle>
          <Typography.Title style={{ marginBottom: 0 }}>
            Watchlist
          </Typography.Title>
        </PageTitle>
        {content}
      </div>
    </>
  )
}

export default Watchlist
