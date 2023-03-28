import PropTypes from 'prop-types'
import { Card, Typography } from 'antd'
import { DeleteOutlined } from '@ant-design/icons'

import useContainer from './hook'

const ListItem = ({ list }) => {
  const { handleClick, handleDelete } = useContainer({ listId: list.id })

  return (
    <Card
      hoverable
      actions={[
        <DeleteOutlined
          key='delete'
          onClick={handleDelete}
        />
      ]}
      onClick={handleClick}
    >
      <Typography.Title level={4}>{list.name}</Typography.Title>
      {list.description}
    </Card>
  )
}

ListItem.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    description: PropTypes.string
  })
}

ListItem.defaultProps = {
  list: {}
}

export default ListItem
