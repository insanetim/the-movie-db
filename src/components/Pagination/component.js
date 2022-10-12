import React from 'react'
import { Row, Col, Pagination as AntdPagination } from 'antd'

const Pagination = props => (
  <Row justify='center'>
    <Col>
      <AntdPagination
        className='pagination'
        showSizeChanger={false}
        {...props}
      />
    </Col>
  </Row>
)

export default Pagination
