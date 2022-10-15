import React from 'react'
import { Row, Col, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'
import { isEmpty } from 'lodash'

import MoviesList from 'src/components/MoviesList'
import Loading from 'src/components/Loading'
import { useContainer } from './hook'

const Watchlist = () => {
  const { watchlist, handlePagination, handleDelete } = useContainer()

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
      {isEmpty(watchlist) ? (
        <Loading />
      ) : (
        <MoviesList
          movies={watchlist}
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

export default Watchlist
