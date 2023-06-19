import { Pagination as AntdPagination, Col, PaginationProps, Row } from 'antd'

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
