import { Row, Col } from 'antd'

import type { ListsListProps } from './types'
import ListItem from '../ListItem'

const ListsList: React.FC<ListsListProps> = ({ lists }) => {
  return (
    <Row gutter={[24, 16]}>
      {lists.map(list => (
        <Col
          key={list.id}
          span={24}
          sm={12}
          md={8}
          lg={8}
          xl={6}
        >
          <ListItem list={list} />
        </Col>
      ))}
    </Row>
  )
}

export default ListsList
