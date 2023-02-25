import React from 'react'
import { Row, Col, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { isEmpty, not } from 'ramda'

import MoviesList from 'src/components/MoviesList'
import Loading from 'src/components/Loading'
import Error from 'src/components/Error'
import useContainer from './hook'

const Favorites = () => {
  const { movies, loading, error, handlePagination, handleDelete } = useContainer()

  return (
    <>
      <Row>
        <Col
          offset={2}
          span={20}
        >
          <div className='top-margin'>
            <Typography.Title>Favorites</Typography.Title>
          </div>
        </Col>
      </Row>
      {loading && <Loading />}
      {error && <Error error={error} />}
      {not(isEmpty(movies)) && (
        <MoviesList
          movies={movies}
          actions={[
            <DeleteOutlined
              key='delete'
              onClick={handleDelete}
            />
          ]}
          handlePagination={handlePagination}
        />
      )}
    </>
  )
}

export default Favorites
