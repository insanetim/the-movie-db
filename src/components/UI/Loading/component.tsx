import { Col, Row, Spin } from 'antd'

const Loading: React.FC = () => (
  <Row
    className='top-margin'
    justify='center'
  >
    <Col>
      <Spin />
    </Col>
  </Row>
)

export default Loading
