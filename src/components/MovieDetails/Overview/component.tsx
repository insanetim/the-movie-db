import { Col, Typography } from 'antd'

import { OverviewProps } from './types'

const Overview: React.FC<OverviewProps> = ({ overview }) => {
  return (
    <Col span={24}>
      <Typography.Title level={3}>Overview</Typography.Title>
      <Typography.Paragraph>{overview}</Typography.Paragraph>
    </Col>
  )
}

export default Overview
