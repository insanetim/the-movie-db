import React from 'react'
import { Row, Col, Spin } from 'antd'

const Loading = () => (
  <Row justify='center'>
    <Col>
      <Spin />
    </Col>
  </Row>
)

export default Loading
