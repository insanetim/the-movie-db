import { Row, Col, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import MoviesList from 'src/components/MoviesList'
import Loading from 'src/components/UI/Loading'
import Error from 'src/components/UI/Error'
import useContainer from './hook'

const Watchlist = () => {
  const { movies, loading, error, handlePagination, handleDelete } = useContainer()

  return (
    <div className='container'>
      <Row>
        <Col span={24}>
          <Typography.Title>Watchlist</Typography.Title>
        </Col>
      </Row>
      {loading && (
        <div className='top-margin'>
          <Loading />
        </div>
      )}
      {error && <Error error={error} />}
      {!loading && !error && (
        <MoviesList
          movies={movies}
          actions={[
            <DeleteOutlined
              key='delete'
              onClick={handleDelete}
            />
          ]}
          handleDelete={handleDelete}
          handlePagination={handlePagination}
        />
      )}
    </div>
  )
}

export default Watchlist
