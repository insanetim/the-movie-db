import { Row, Col, Typography } from 'antd'
import { PlusCircleOutlined } from '@ant-design/icons'

import ListsList from 'src/components/Lists/ListsList'
import Loading from 'src/components/Loading'
import Error from 'src/components/Error'
import useContainer from './hook'

const Lists = () => {
  const { lists, loading, error, handleClick } = useContainer()

  return (
    <>
      <Row justify='center'>
        <Col span={20}>
          <div className='top-margin'>
            <Typography.Title>
              My Lists <PlusCircleOutlined onClick={handleClick} />
            </Typography.Title>
          </div>
        </Col>
      </Row>
      {loading && <Loading />}
      {error && <Error error={error} />}
      {!loading && !error && <ListsList lists={lists} />}
    </>
  )
}

export default Lists
