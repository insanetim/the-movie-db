import { Col, Flex, Row } from 'antd'

import { PageTitleProps } from './types'

const PageTitle: React.FC<PageTitleProps> = ({ children }) => (
  <Row>
    <Col span={24}>
      <Flex
        align='center'
        gap='middle'
        style={{ marginBottom: 24 }}
      >
        {children}
      </Flex>
    </Col>
  </Row>
)

export default PageTitle
