import { Col, Typography } from 'antd'
import convertMoney from 'src/utils/convertDataHelpers/convertMoney'

import { RevenueProps } from './types'

const Revenue: React.FC<RevenueProps> = ({ revenue }) => (
  <Col span={24}>
    <Typography.Paragraph>
      <b>Revenue: </b>
      <span>{convertMoney(revenue)}</span>
    </Typography.Paragraph>
  </Col>
)

export default Revenue
