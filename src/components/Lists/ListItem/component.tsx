import { DeleteOutlined } from '@ant-design/icons'
import { Card, Typography } from 'antd'

import useContainer from './hook'
import { ListItemProps } from './types'

const ListItem: React.FC<ListItemProps> = ({ list }) => {
  const { handleClick, handleListDelete } = useContainer({ listId: list.id })

  return (
    <Card
      actions={[
        <DeleteOutlined
          key='delete'
          onClick={handleListDelete}
        />
      ]}
      hoverable
      onClick={handleClick}
    >
      <Typography.Title level={4}>{list.name}</Typography.Title>
      {list.description}
    </Card>
  )
}

export default ListItem
