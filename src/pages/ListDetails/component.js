import { Row, Col, Typography } from 'antd'
import { MinusCircleOutlined, DeleteOutlined } from '@ant-design/icons'

import ListContent from 'src/components/ListContent'
import Loading from 'src/components/Loading'
import Error from 'src/components/Error'
import useContainer from './hook'

const ListDetails = () => {
  const { list, loading, error, handleListDelete, handleMovieDelete } = useContainer()

  if (loading) {
    return (
      <div className='top-margin'>
        <Loading />
      </div>
    )
  }

  if (error) {
    return (
      <div className='top-margin'>
        <Error error={error} />
      </div>
    )
  }

  return (
    <>
      <Row>
        <Col
          offset={2}
          span={20}
        >
          <div className='top-margin'>
            <Typography.Title>
              {list.name} <MinusCircleOutlined onClick={handleListDelete} />
            </Typography.Title>
          </div>
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
    </>
  )
}

export default ListDetails
