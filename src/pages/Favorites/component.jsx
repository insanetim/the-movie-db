import { DeleteOutlined } from '@ant-design/icons'

import Loading from 'src/components/UI/Loading'
import Error from 'src/components/UI/Error'
import MoviesList from 'src/components/Movies/MoviesList'
import Pagination from 'src/components/UI/Pagination'
import PageTitle from 'src/components/UI/PageTitle'
import useContainer from './hook'

const Favorites = () => {
  const { movies, loading, error, handlePagination, handleDelete } = useContainer()

  return (
    <div className='container'>
      <PageTitle>Favorites</PageTitle>
      {loading && (
        <div className='top-margin'>
          <Loading />
        </div>
      )}
      {error && <Error error={error} />}
      {!loading && !error && (
        <>
          <MoviesList
            movies={movies.results}
            actions={[
              <DeleteOutlined
                key='delete'
                onClick={handleDelete}
              />
            ]}
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
      )}
    </div>
  )
}

export default Favorites