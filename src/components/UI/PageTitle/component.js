import PropTypes from 'prop-types'
import { Row, Col, Typography } from 'antd'

const PageTitle = ({ children }) => (
  <Row>
    <Col span={24}>
      <Typography.Title>{children}</Typography.Title>
    </Col>
  </Row>
)

PageTitle.propTypes = {
  children: PropTypes.node.isRequired
}

export default PageTitle
