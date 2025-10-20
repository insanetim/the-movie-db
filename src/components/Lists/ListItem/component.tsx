import { DeleteOutlined } from '@ant-design/icons'
import { Card, Typography } from 'antd'

import useContainer from './hook'
import { ListItemProps } from './types'

const ListItem: React.FC<ListItemProps> = ({ description, listId, name }) => {
  const { handleConfirmDeleteList, handleNavigateToList } = useContainer({
    listId,
    name,
  })

  return (
    <Card
      actions={[
        <DeleteOutlined
          data-testid='deleteListBtn'
          key='delete'
          onClick={handleConfirmDeleteList}
        />,
      ]}
      data-testid='listItemCard'
      hoverable
      onClick={handleNavigateToList}
    >
      <Typography.Title level={4}>{name}</Typography.Title>
      {description}
    </Card>
  )
}

export default ListItem
