import { ArrowLeftOutlined } from '@ant-design/icons'
import { Col, Row, Typography } from 'antd'
import { Link } from 'react-router-dom'

import { GoBackLinkProps } from './types'

const GoBackLink: React.FC<GoBackLinkProps> = ({ href, title }) => (
  <Row>
    <Col span={24}>
      <Typography.Paragraph>
        <Link to={href}>
          <ArrowLeftOutlined /> {title}
        </Link>
      </Typography.Paragraph>
    </Col>
  </Row>
)

export default GoBackLink
