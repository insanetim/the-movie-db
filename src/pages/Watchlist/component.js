import React from 'react'
import { Row, Col, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import MoviesList from 'src/components/MoviesList'
import Loading from 'src/components/Loading'
import Error from 'src/components/Error'
import useContainer from './hook'

const Watchlist = () => {
  const { movies, loading, error, handlePagination, handleDelete } = useContainer()

  return (
    <>
      <Row>
        <Col
          offset={2}
          span={20}
        >
          <div className='top-margin'>
            <Typography.Title>Watchlist</Typography.Title>
          </div>
        </Col>
      </Row>
      {loading && <Loading />}
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
    </>
  )
}

export default Watchlist
