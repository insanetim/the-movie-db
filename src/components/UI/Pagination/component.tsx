import { Row, Col, Pagination as AntdPagination, PaginationProps } from 'antd'

const Pagination: React.FC<PaginationProps> = props => (
  <Row justify='center'>
    <Col>
      <AntdPagination
        className='pagination'
        showSizeChanger={false}
        {...props}
      />
    </Col>
  </Row>
)

export default Pagination
