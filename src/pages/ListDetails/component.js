import React from 'react'
import { Row, Col, Typography, Modal, Pagination } from 'antd'
import { MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons'
import { range } from 'lodash'

import Movie from 'src/components/MovieItem'
import { useParams } from 'react-router-dom'

const showDeleteMovieModal = () => {
  Modal.confirm({
    title: 'Do you want to delete movie from this list?',
    onOk() {},
    onCancel() {}
  })
}

const showDeleteListModal = () => {
  Modal.confirm({
    title: 'Do you want to delete list?',
    onOk() {},
    onCancel() {}
  })
}

const ListDetails = () => {
  const params = useParams()

  return (
    <>
      <Row>
        <Col
          offset={2}
          span={20}
        >
          <div className='top-margin'>
            <Typography.Title>
              List item {params.list_id} <MinusCircleOutlined onClick={showDeleteListModal} />
            </Typography.Title>
          </div>
        </Col>
      </Row>
      <Row
        gutter={8}
        type='flex'
      >
        <Col
          span={20}
          offset={2}
        >
          <Row
            gutter={{
              xs: 8,
              sm: 16,
              md: 24,
              lg: 32
            }}
          >
            {range(10).map(item => (
              <Col
                key={item}
                xs={{ span: 24 }}
                sm={{ span: 12 }}
                md={{ span: 8 }}
                lg={{ span: 8 }}
                xl={{ span: 6 }}
              >
                <Movie
                  actions={[
                    <DeleteOutlined
                      key='delete'
                      onClick={showDeleteMovieModal}
                    />
                  ]}
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      <Row
        type='flex'
        justify='center'
      >
        <Col>
          <Pagination
            defaultCurrent={1}
            total={50}
            className='pagination'
          />
        </Col>
      </Row>
    </>
  )
}

export default ListDetails
