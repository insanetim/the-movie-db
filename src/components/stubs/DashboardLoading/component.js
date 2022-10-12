import React from 'react'
import { Row, Col, Spin } from 'antd'

const DashboardLoading = () => (
  <Row
    type='flex'
    justify='center'
  >
    <Col>
      <Spin />
    </Col>
  </Row>
)

export default DashboardLoading
