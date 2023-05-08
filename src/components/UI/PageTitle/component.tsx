import { Row, Col, Typography } from 'antd'

import { PageTitleProps } from './types'

const PageTitle: React.FC<PageTitleProps> = ({ children }) => (
  <Row>
    <Col span={24}>
      <Typography.Title>{children}</Typography.Title>
    </Col>
  </Row>
)

export default PageTitle
