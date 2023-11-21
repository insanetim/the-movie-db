import { Col, Row } from 'antd'

import ListItem from '../ListItem'
import { ListsListProps } from './types'

const ListsList: React.FC<ListsListProps> = ({ lists }) => {
  return (
    <Row gutter={[24, 16]}>
      {lists.map(list => (
        <Col
          key={list.id}
          lg={8}
          md={8}
          sm={12}
          span={24}
          xl={6}
        >
          <ListItem list={list} />
        </Col>
      ))}
    </Row>
  )
}

export default ListsList
