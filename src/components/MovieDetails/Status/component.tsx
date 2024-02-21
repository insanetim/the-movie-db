import { Col, Typography } from 'antd'

import { StatusProps } from './types'

const Status: React.FC<StatusProps> = ({ status }) => {
  return (
    <Col span={24}>
      <Typography.Paragraph>
        <b>Status: </b>
        <span>{status}</span>
      </Typography.Paragraph>
    </Col>
  )
}

export default Status
