import { Col, Typography } from 'antd'
import convertDuration from 'src/utils/convertDataHelpers/convertDuration'

import { RuntimeProps } from './types'

const Runtime: React.FC<RuntimeProps> = ({ runtime }) => (
  <Col span={24}>
    <Typography.Paragraph>
      <b>Runtime: </b>
      <span>{convertDuration(runtime)}</span>
    </Typography.Paragraph>
  </Col>
)

export default Runtime
