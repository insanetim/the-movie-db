import { Row, Col, Spin } from 'antd'

const Loading: React.FC = () => (
  <Row justify='center'>
    <Col>
      <Spin />
    </Col>
  </Row>
)

export default Loading
