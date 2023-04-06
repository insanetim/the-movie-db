import { Row, Col, Typography } from 'antd'
import { MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons'

import ListContent from 'src/components/ListContent'
import Loading from 'src/components/UI/Loading'
import Error from 'src/components/UI/Error'
import useContainer from './hook'

const ListDetails = () => {
  const { list, loading, error, handleListDelete, handleMovieDelete } = useContainer()

  if (loading) {
    return (
      <div className='container top-margin'>
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className='container top-margin'>
        <Error error={error} />
      </div>
    )
  }

  return (
    <div className='container'>
      <Row>
        <Col span={24}>
          <Typography.Title>
            {list.name} <MinusCircleOutlined onClick={handleListDelete} />
          </Typography.Title>
        </Col>
      </Row>
      <ListContent
        movies={list.items}
        actions={[
          <DeleteOutlined
            key='delete'
            onClick={handleMovieDelete}
          />
        ]}
      />
    </div>
  )
}

export default ListDetails
