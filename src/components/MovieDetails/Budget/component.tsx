import { Col, Typography } from 'antd'
import convertMoney from 'src/utils/convertDataHelpers/convertMoney'

import { BudgetProps } from './types'

const Budget: React.FC<BudgetProps> = ({ budget }) => (
  <Col span={24}>
    <Typography.Paragraph>
      <b>Budget: </b>
      <span>{convertMoney(budget)}</span>
    </Typography.Paragraph>
  </Col>
)

export default Budget
