import React from 'react'
import { Row, Col, Typography } from 'antd'
import { MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons'

import Loading from 'src/components/Loading'
import ListContent from 'src/components/ListContent'
import { useContainer } from './hook'

const ListDetails = () => {
  const { list, loading, handleListDelete, handleMovieDelete } = useContainer()

  if (loading) {
    return (
      <div className='top-margin'>
        <Loading />
      </div>
    )
  }

  return (
    <>
      <Row>
        <Col
          offset={2}
          span={20}
        >
          <div className='top-margin'>
            <Typography.Title>
              {list.name} <MinusCircleOutlined onClick={handleListDelete} />
            </Typography.Title>
          </div>
        </Col>
      </Row>
      <ListContent
        movies={list.items}
        actions={[
          <DeleteOutlined
            key='delete'
            onClick={handleMovieDelete}
          />
        ]}
      />
    </>
  )
}

export default ListDetails
