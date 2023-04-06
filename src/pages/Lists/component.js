import { Row, Col, Typography } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

import ListsList from 'src/components/Lists/ListsList'
import Loading from 'src/components/UI/Loading'
import Error from 'src/components/UI/Error'
import useContainer from './hook'

const Lists = () => {
  const { lists, loading, error, handleClick } = useContainer()

  return (
    <div className='container'>
      <Row>
        <Col span={24}>
          <Typography.Title>
            My Lists <PlusCircleOutlined onClick={handleClick} />
          </Typography.Title>
        </Col>
      </Row>
      {loading && (
        <div className='top-margin'>
          <Loading />
        </div>
      )}
      {error && <Error error={error} />}
      {!loading && !error && <ListsList lists={lists} />}
    </div>
  )
}

export default Lists
