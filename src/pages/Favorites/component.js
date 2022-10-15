import React from 'react'
import { Row, Col, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { isEmpty } from 'lodash'

import MoviesList from 'src/components/MoviesList'
import Loading from 'src/components/Loading'
import { useContainer } from './hook'

const Favorites = () => {
  const { favorites, handlePagination, handleDelete } = useContainer()

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
      {isEmpty(favorites) ? (
        <Loading />
      ) : (
        <MoviesList
          movies={favorites}
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
