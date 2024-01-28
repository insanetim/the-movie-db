import { DeleteOutlined } from '@ant-design/icons'
import { Card, Typography } from 'antd'

import useContainer from './hook'
import { ListItemProps } from './types'

const ListItem: React.FC<ListItemProps> = ({ description, id, name }) => {
  const { handleClick, handleListDelete } = useContainer({ id, name })

  return (
    <Card
      actions={[
        <DeleteOutlined
          data-testid='deleteListBtn'
          key='delete'
          onClick={handleListDelete}
        />,
      ]}
      data-testid='listItemCard'
      hoverable
      onClick={handleClick}
    >
      <Typography.Title level={4}>{name}</Typography.Title>
      {description}
    </Card>
  )
}

export default ListItem
