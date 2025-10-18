import { Col, Row } from 'antd'

import ListItem from '../ListItem'
import { ListsListProps } from './types'

const ListsList: React.FC<ListsListProps> = ({ lists }) => (
  <Row gutter={[24, 16]}>
    {lists.map(({ description, id, name }) => (
      <Col
        key={id}
        lg={8}
        md={8}
        sm={12}
        span={24}
        xl={6}
      >
        <ListItem
          description={description}
          listId={id}
          name={name}
        />
      </Col>
    ))}
  </Row>
)

export default ListsList
